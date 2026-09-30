export enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}

export interface UserDto {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}
