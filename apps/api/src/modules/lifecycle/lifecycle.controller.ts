import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContractStage } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { LifecycleService } from './lifecycle.service';

@ApiTags('lifecycle')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'contracts/:contractId/stages', version: '1' })
export class LifecycleController {
  constructor(private readonly lifecycle: LifecycleService) {}

  @Get()
  stages(@CurrentUser() user: JwtPayload, @Param('contractId') contractId: string) {
    return this.lifecycle.stages(user.organizationId, contractId);
  }

  @Post(':stage/complete')
  complete(@CurrentUser() user: JwtPayload, @Param('contractId') contractId: string, @Param('stage') stage: ContractStage) {
    return this.lifecycle.complete(user.organizationId, user.sub, user.role, contractId, stage);
  }
}
