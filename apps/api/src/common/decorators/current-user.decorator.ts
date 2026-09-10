import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { JwtPayload } from "../../modules/auth/jwt-payload.interface";

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload =>
    context.switchToHttp().getRequest().user as JwtPayload,
);
