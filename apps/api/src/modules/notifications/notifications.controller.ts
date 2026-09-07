import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { JwtPayload } from '../auth/jwt-payload.interface';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'notifications', version: '1' })
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}
  @Get() list(@CurrentUser() user: JwtPayload) { return this.notifications.list(user.sub); }
  @Patch(':id/read') markRead(@CurrentUser() user: JwtPayload, @Param('id') id: string) { return this.notifications.markRead(user.sub, id); }
}
