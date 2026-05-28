import { IsNullable } from '@/utils/custom-validation-classes';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name!: string;

  @IsInt()
  @IsNullable()
  @IsOptional()
  imageId?: number | null;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  adGroups?: string[];
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsNullable()
  @IsOptional()
  imageId?: number | null;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  adGroups?: string[];
}
