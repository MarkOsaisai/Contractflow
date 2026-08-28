import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './common/health.controller';
import { ContractsModule } from './modules/contracts/contracts.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { LifecycleModule } from './modules/lifecycle/lifecycle.module';
import { ComplianceModule } from './modules/compliance/compliance.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';
import { AuditModule } from './modules/audit/audit.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    OrganizationsModule,
    ContractsModule,
    LifecycleModule,
    ComplianceModule,
    DocumentsModule,
    PaymentsModule,
    ActivitiesModule,
    NotificationsModule,
    IntegrationsModule,
    AuditModule,
  ],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class AppModule {}