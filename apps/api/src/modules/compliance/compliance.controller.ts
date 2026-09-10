import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { JwtPayload } from "../auth/jwt-payload.interface";
import { ComplianceService } from "./compliance.service";
import { CreateComplianceDto } from "./dto/create-compliance.dto";

@ApiTags("compliance")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: "contracts/:contractId/compliance", version: "1" })
export class ComplianceController {
  constructor(private readonly compliance: ComplianceService) {}

  @Get()
  list(
    @CurrentUser() user: JwtPayload,
    @Param("contractId") contractId: string,
  ) {
    return this.compliance.list(user.organizationId, contractId);
  }

  @Post()
  @Roles("ORGANIZATION_ADMIN", "HSE_OFFICER")
  create(
    @CurrentUser() user: JwtPayload,
    @Param("contractId") contractId: string,
    @Body() dto: CreateComplianceDto,
  ) {
    return this.compliance.create(user.organizationId, contractId, dto);
  }
}
