import { ExternalUser } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class CreateExternalUserDto implements Partial<Pick<ExternalUser, 'name' | 'org' | 'personNumber'>> {
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  org?: string;
  @IsString()
  personNumber: string;
}

export class UpdateExternalUserDto implements Partial<Pick<ExternalUser, 'org'>> {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  personNumber?: string;
  @IsString()
  @IsOptional()
  org?: string;
}
