import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComplianceRecord } from './entities/compliance_record';
import { ComplianceRequirement } from './entities/compliance_requirement';

@Injectable()
export class ComplianceService {
  constructor(
    @InjectRepository(ComplianceRecord)
    private readonly recordRepo: Repository<ComplianceRecord>,
    @InjectRepository(ComplianceRequirement)
    private readonly requirementRepo: Repository<ComplianceRequirement>,
  ) {}
}
