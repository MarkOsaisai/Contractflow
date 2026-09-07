import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { JwtPayload } from "../auth/jwt-payload.interface";
import { ActivitiesService } from "./activities.service";

@ApiTags("activities")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: "contracts/:contractId/activities", version: "1" })
export class ActivitiesController {
  constructor(private readonly activities: ActivitiesService) {}
  @Get() list(
    @CurrentUser() user: JwtPayload,
    @Param("contractId") contractId: string,
  ) {
    return this.activities.list(user.organizationId, contractId);
  }
}
