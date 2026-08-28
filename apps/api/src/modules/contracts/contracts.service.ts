import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ContractsService {
  constructor(private readonly prisma: PrismaService) {}

  findForOrganization(organizationId: string) {
    return this.prisma.contract.findMany({
      where: { organizationId },
      include: { clientOrganization: { select: { id: true, name: true } } },
      orderBy: { updatedAt: 'desc' },
    });
  }
}