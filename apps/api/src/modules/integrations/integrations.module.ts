import { Module } from "@nestjs/common";
import { JqsController } from "./jqs.controller";
import { JqsService } from "./jqs.service";

@Module({ controllers: [JqsController], providers: [JqsService] })
export class IntegrationsModule {}
