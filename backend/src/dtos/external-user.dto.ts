import { ExternalUser } from '@prisma/client';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateExternalUserDto implements Partial<Pick<ExternalUser, 'name' | 'org' | 'personNumber'>> {
  @IsString()
  name!: string;
  @IsOptional()
  @IsString()
  org?: string;
  @IsString()
  personNumber!: string;
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categoryIds?: number[];
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
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categoryIds?: number[];
}
