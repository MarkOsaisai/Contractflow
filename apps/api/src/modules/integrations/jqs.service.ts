import { Injectable } from "@nestjs/common";

@Injectable()
export class JqsService {
  async search(query: string) {
    return {
      query,
      source: "MANUAL_VERIFICATION_REQUIRED",
      available: false,
      message:
        "JQS verification is unavailable. Record a manual verification and continue the workflow.",
    };
  }
}
