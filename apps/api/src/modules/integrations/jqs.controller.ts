import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { JqsService } from "./jqs.service";

@ApiTags("integrations")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: "integrations/jqs", version: "1" })
export class JqsController {
  constructor(private readonly jqs: JqsService) {}
  @Get("search") search(@Query("q") query = "") {
    return this.jqs.search(query);
  }
}
