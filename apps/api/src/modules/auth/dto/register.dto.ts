import { OrganizationType, UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(12)
  password!: string;

  @IsString()
  displayName!: string;

  @IsString()
  organizationName!: string;

  @IsOptional()
  @IsEnum(OrganizationType)
  organizationType: OrganizationType = OrganizationType.CONTRACTOR;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole = UserRole.ORGANIZATION_ADMIN;
}
