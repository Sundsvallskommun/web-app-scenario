import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
}

export interface Permissions {
  canEditSystemMessages: boolean;
}

/** Internal roles */
export type InternalRole = 'app_admin' | 'app_read';
export enum InternalRoleEnum {
  Read = 'app_read',
  Admin = 'app_admin',
}
