import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  findForOrganization(organizationId: string) {
    return this.prisma.activity.findMany({
      where: { organizationId },
      include: { actor: { select: { id: true, displayName: true } } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}
