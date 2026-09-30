import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from './contract-controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContractController])],
  controllers: [ContractController],
  providers: [],
  exports: [],
})
export class ContractModule {}
