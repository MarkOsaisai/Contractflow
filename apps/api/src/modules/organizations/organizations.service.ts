import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OrganizationType } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  create(createOrganizationDto: { name: string; type: OrganizationType }) {
    return this.prisma.organization.create({
      data: createOrganizationDto,
    });
  }

  findAll() {
    return this.prisma.organization.findMany();
  }

  findOne(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
    });
  }

  update(id: string, updateOrganizationDto: { name?: string; type?: OrganizationType }) {
    return this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  remove(id: string) {
    return this.prisma.organization.delete({
      where: { id },
    });
  }
}
