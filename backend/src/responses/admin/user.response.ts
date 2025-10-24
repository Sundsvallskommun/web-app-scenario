import ApiResponse from '@/interfaces/api-service.interface';
import { Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { InternalRoleEnum } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';

export class AdminUser implements User {
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsString()
  givenName: string;
  @IsString()
  surname: string;
  @IsEnum(InternalRoleEnum)
  role: InternalRoleEnum;
}

export class AdminUserApiResponse implements ApiResponse<AdminUser> {
  @ValidateNested()
  @Type(() => AdminUser)
  data: AdminUser;
  @IsString()
  message: string;
}
