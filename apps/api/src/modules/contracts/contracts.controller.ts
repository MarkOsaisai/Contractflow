import { BadRequestException, Controller, Get, Headers } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ContractsService } from './contracts.service';

@ApiTags('contracts')
@Controller({ path: 'contracts', version: '1' })
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  @ApiHeader({ name: 'x-organization-id', required: true })
  findAll(@Headers('x-organization-id') organizationId?: string) {
    if (!organizationId?.trim()) {
      throw new BadRequestException('x-organization-id header is required');
    }

    return this.contractsService.findForOrganization(organizationId);
  }
}