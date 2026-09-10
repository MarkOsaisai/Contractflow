import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  findForOrganization(organizationId: string) {
    return this.prisma.document.findMany({
      where: { contract: { organizationId } },
      include: { versions: { orderBy: { version: "desc" }, take: 1 } },
      orderBy: { updatedAt: "desc" },
    });
  }

  async createMetadata(
    organizationId: string,
    data: { contractId: string; name: string; category: string },
  ) {
    const contract = await this.prisma.contract.findFirst({
      where: { id: data.contractId, organizationId },
    });
    if (!contract) {
      throw new NotFoundException("Contract not found");
    }

    return this.prisma.document.create({
      data: {
        contractId: data.contractId,
        name: data.name,
        category: data.category,
      },
    });
  }
}
