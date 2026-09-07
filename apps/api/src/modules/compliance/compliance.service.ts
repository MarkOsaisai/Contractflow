import { Injectable, NotFoundException } from "@nestjs/common";
import { ComplianceStatus } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";
import { CreateComplianceDto } from "./dto/create-compliance.dto";

@Injectable()
export class ComplianceService {
  constructor(private readonly prisma: PrismaService) {}

  async list(organizationId: string, contractId: string) {
    await this.assertContract(organizationId, contractId);
    const records = await this.prisma.complianceRecord.findMany({
      where: { contractId },
      orderBy: { expiresAt: "asc" },
    });
    return records.map((record) => ({
      ...record,
      status: this.currentStatus(record.status, record.expiresAt),
    }));
  }

  async create(
    organizationId: string,
    contractId: string,
    dto: CreateComplianceDto,
  ) {
    await this.assertContract(organizationId, contractId);
    return this.prisma.complianceRecord.create({
      data: {
        contractId,
        certificateType: dto.certificateType,
        verificationSource: dto.verificationSource,
        status: dto.status ?? ComplianceStatus.PENDING,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : undefined,
      },
    });
  }

  private currentStatus(status: ComplianceStatus, expiresAt: Date | null) {
    return expiresAt && expiresAt < new Date()
      ? ComplianceStatus.EXPIRED
      : status;
  }

  private async assertContract(organizationId: string, contractId: string) {
    const contract = await this.prisma.contract.findFirst({
      where: { id: contractId, organizationId },
    });
    if (!contract) throw new NotFoundException("Contract not found");
  }
}
