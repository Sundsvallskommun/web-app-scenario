import { IsNullable } from '@/utils/custom-validation-classes';
import { Scenario } from '@prisma/client';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateScenarioDto implements Partial<Pick<Scenario, 'name' | 'description' | 'imageId' | 'assistantId'>> {
  @IsString()
  name: string;
  @IsString()
  assistantId?: string;
  @IsString()
  @IsNullable()
  @IsOptional()
  description?: string | null;
  @IsBoolean()
  @IsOptional()
  published?: boolean;
  @IsInt()
  @IsNullable()
  @IsOptional()
  imageId?: number;
}

export class UpdateScenarioDto implements Partial<Pick<Scenario, 'name' | 'description' | 'imageId' | 'assistantId'>> {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  assistantId?: string;
  @IsString()
  @IsNullable()
  @IsOptional()
  description?: string | null;
  @IsBoolean()
  @IsOptional()
  published?: boolean;
  @IsInt()
  @IsNullable()
  @IsOptional()
  imageId?: number;
}
