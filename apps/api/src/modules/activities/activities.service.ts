import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}
  async list(organizationId: string, contractId: string) {
    if (!(await this.prisma.contract.findFirst({ where: { id: contractId, organizationId } }))) throw new NotFoundException('Contract not found');
    return this.prisma.activity.findMany({ where: { contractId, organizationId }, include: { actor: { select: { id: true, displayName: true } } }, orderBy: { createdAt: 'desc' } });
  }
}
