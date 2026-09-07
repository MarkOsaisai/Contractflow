import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentMilestone, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

const TRANSITIONS: Record<PaymentStatus, PaymentStatus[]> = {
  DRAFT: [PaymentStatus.SUBMITTED], SUBMITTED: [PaymentStatus.APPROVED, PaymentStatus.DISPUTED], APPROVED: [PaymentStatus.PAID, PaymentStatus.DISPUTED], PAID: [], DISPUTED: [PaymentStatus.DRAFT],
};
@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(organizationId: string, contractId: string) {
    await this.assertContract(organizationId, contractId);
    return (await this.prisma.paymentMilestone.findMany({ where: { contractId }, orderBy: { dueDate: 'asc' } })).map(this.toResponse);
  }

  async create(organizationId: string, contractId: string, dto: CreatePaymentDto) {
    await this.assertContract(organizationId, contractId);
    return this.toResponse(await this.prisma.paymentMilestone.create({ data: { contractId, title: dto.title, amountKobo: BigInt(dto.amountKobo), currency: dto.currency ?? 'NGN', dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined } }));
  }

  async transition(organizationId: string, actorId: string, id: string, status: PaymentStatus) {
    const milestone = await this.prisma.paymentMilestone.findFirst({ where: { id, contract: { organizationId } } });
    if (!milestone) throw new NotFoundException('Payment milestone not found');
    if (!TRANSITIONS[milestone.status].includes(status)) throw new BadRequestException('Invalid payment status transition');
    const updated = await this.prisma.paymentMilestone.update({ where: { id }, data: { status, version: { increment: 1 } } });
    await this.prisma.auditLog.create({ data: { organizationId, actorId, eventType: 'PAYMENT_CHANGE', entityType: 'PaymentMilestone', entityId: id, oldValue: { status: milestone.status }, newValue: { status } } });
    return this.toResponse(updated);
  }

  private async assertContract(organizationId: string, contractId: string) { if (!(await this.prisma.contract.findFirst({ where: { id: contractId, organizationId } }))) throw new NotFoundException('Contract not found'); }
  private toResponse(milestone: PaymentMilestone) { return { ...milestone, amountKobo: milestone.amountKobo.toString() }; }
}
