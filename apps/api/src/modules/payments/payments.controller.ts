import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PaymentStatus } from "@prisma/client";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { Roles } from "../../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { JwtPayload } from "../auth/jwt-payload.interface";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { PaymentsService } from "./payments.service";

@ApiTags("payments")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: "contracts/:contractId/payment-milestones", version: "1" })
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}
  @Get() list(
    @CurrentUser() user: JwtPayload,
    @Param("contractId") contractId: string,
  ) {
    return this.payments.list(user.organizationId, contractId);
  }
  @Post() @Roles("ORGANIZATION_ADMIN", "FINANCE_OFFICER") create(
    @CurrentUser() user: JwtPayload,
    @Param("contractId") contractId: string,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.payments.create(user.organizationId, contractId, dto);
  }
  @Post(":id/:status")
  @Roles("ORGANIZATION_ADMIN", "FINANCE_OFFICER")
  transition(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
    @Param("status") status: PaymentStatus,
  ) {
    return this.payments.transition(user.organizationId, user.sub, id, status);
  }
}
