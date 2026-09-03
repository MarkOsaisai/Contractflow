import { UserRole } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  organizationId: string;
  role: UserRole;
  email: string;
}
