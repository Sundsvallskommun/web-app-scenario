import ApiResponse from '@/interfaces/api-service.interface';
import { ExternalUser as _ExternalUser } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CategorySummary } from './category.response';

export class ExternalUser implements _ExternalUser {
  @IsInt()
  id: number;
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  org: string;
  @IsString()
  personNumber: string;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CategorySummary)
  categories?: CategorySummary[];
  @IsDateString()
  createdAt: Date;
  @IsDateString()
  updatedAt: Date;
}

export class ExternalUsersApiResponse implements ApiResponse<ExternalUser[]> {
  @ValidateNested({ each: true })
  @Type(() => ExternalUser)
  data: ExternalUser[];
  @IsString()
  message: string;
}

export class ExternalUserApiResponse implements ApiResponse<ExternalUser> {
  @ValidateNested()
  @Type(() => ExternalUser)
  data: ExternalUser;
  @IsString()
  message: string;
}

export class ExternalUserDeleteApiResponse implements ApiResponse<boolean> {
  @IsBoolean()
  data: boolean;
  @IsString()
  message: string;
}
