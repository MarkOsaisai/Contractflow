import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email is already registered');

    const organization = await this.prisma.organization.create({
      data: { name: dto.organizationName, type: dto.organizationType },
    });
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        displayName: dto.displayName,
        passwordHash: await bcrypt.hash(dto.password, 12),
        role: dto.role,
        organizationId: organization.id,
      },
    });
    return this.tokensFor(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !user.isActive || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.tokensFor(user);
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      });
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user || !user.isActive) throw new UnauthorizedException();
      return this.tokensFor(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async tokensFor(user: { id: string; organizationId: string; role: JwtPayload['role']; email: string; displayName: string }) {
    const payload: JwtPayload = {
      sub: user.id,
      organizationId: user.organizationId,
      role: user.role,
      email: user.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(payload),
      this.jwt.signAsync(payload, {
        secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: 604800,
      }),
    ]);
    return { accessToken, refreshToken, user: { id: user.id, email: user.email, displayName: user.displayName, role: user.role, organizationId: user.organizationId } };
  }
}
