import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentMilestone, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async findForOrganization(organizationId: string) {
    const milestones = await this.prisma.paymentMilestone.findMany({
      where: { contract: { organizationId } },
      orderBy: { dueDate: 'asc' },
    });
    return milestones.map((milestone) => this.toResponse(milestone));
  }

  async updateStatus(organizationId: string, id: string, status: PaymentStatus) {
    const milestone = await this.prisma.paymentMilestone.findFirst({
      where: { id, contract: { organizationId } },
    });
    if (!milestone) {
      throw new NotFoundException('Payment milestone not found');
    }

    const updated = await this.prisma.paymentMilestone.update({
      where: { id },
      data: { status, version: { increment: 1 } },
    });
    return this.toResponse(updated);
  }

  // amountKobo is a BigInt in the DB and cannot be JSON-serialized directly.
  private toResponse(milestone: PaymentMilestone) {
    return {
      id: milestone.id,
      contractId: milestone.contractId,
      title: milestone.title,
      amount: Number(milestone.amountKobo) / 100,
      currency: milestone.currency,
      dueDate: milestone.dueDate,
      status: milestone.status,
      version: milestone.version,
      createdAt: milestone.createdAt,
      updatedAt: milestone.updatedAt,
    };
  }
}


