export interface JwtPayload {
  sub: string;
  email: string;
  organizationId: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
