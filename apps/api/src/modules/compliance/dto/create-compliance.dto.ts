import { ComplianceStatus, VerificationSource } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateComplianceDto {
  @IsString()
  certificateType!: string;

  @IsEnum(VerificationSource)
  verificationSource!: VerificationSource;

  @IsOptional()
  @IsEnum(ComplianceStatus)
  status?: ComplianceStatus;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
