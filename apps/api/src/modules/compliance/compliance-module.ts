import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplianceController } from './compliance-controller';

@Module({
  imports: [TypeOrmModule.forFeature([ComplianceController])],
  controllers: [ComplianceController],
  providers: [],
  exports: [ComplianceController],
})
export class ComplianceModule {}
