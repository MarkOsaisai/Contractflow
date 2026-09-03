import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ContractStage, ContractStatus, UserRole } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

const STAGES: ContractStage[] = [
  ContractStage.BID,
  ContractStage.AWARD,
  ContractStage.MOBILIZATION,
  ContractStage.EXECUTION,
  ContractStage.COMPLETION,
  ContractStage.COMMISSIONING,
  ContractStage.CLOSED,
];
const LIFECYCLE_MANAGERS: UserRole[] = [
  UserRole.ORGANIZATION_ADMIN,
  UserRole.CONTRACTOR_PM,
  UserRole.CLIENT_PM,
];

@Injectable()
export class LifecycleService {
  constructor(private readonly prisma: PrismaService) {}

  async stages(organizationId: string, contractId: string) {
    const contract = await this.contractForOrganization(organizationId, contractId);
    const currentIndex = STAGES.indexOf(contract.stage);
    return STAGES.map((stage, index) => ({
      stage,
      status: index < currentIndex ? 'COMPLETED' : index === currentIndex ? 'CURRENT' : 'PENDING',
      canComplete: index === currentIndex && stage !== ContractStage.CLOSED,
    }));
  }

  async complete(organizationId: string, actorId: string, role: UserRole, contractId: string, stage: ContractStage) {
    if (!LIFECYCLE_MANAGERS.includes(role)) {
      throw new BadRequestException('Your role cannot advance a contract lifecycle');
    }
    const contract = await this.contractForOrganization(organizationId, contractId);
    if (contract.stage !== stage) throw new BadRequestException('Only the current stage can be completed');

    const nextStage = STAGES[STAGES.indexOf(stage) + 1];
    if (!nextStage) throw new BadRequestException('Contract lifecycle is already complete');
    const updated = await this.prisma.contract.update({
      where: { id: contractId },
      data: { stage: nextStage, status: nextStage === ContractStage.CLOSED ? ContractStatus.COMPLETED : contract.status },
    });
    await this.prisma.$transaction([
      this.prisma.activity.create({ data: { organizationId, contractId, actorId, type: 'LIFECYCLE_CHANGE', message: `Completed ${stage}; advanced to ${nextStage}.` } }),
      this.prisma.auditLog.create({ data: { organizationId, actorId, eventType: 'LIFECYCLE_CHANGE', entityType: 'Contract', entityId: contractId, oldValue: { stage }, newValue: { stage: nextStage } } }),
    ]);
    return updated;
  }

  private async contractForOrganization(organizationId: string, contractId: string) {
    const contract = await this.prisma.contract.findFirst({ where: { id: contractId, organizationId } });
    if (!contract) throw new NotFoundException('Contract not found');
    return contract;
  }
}
