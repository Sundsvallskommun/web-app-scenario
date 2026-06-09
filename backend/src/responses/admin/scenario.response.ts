import ApiResponse from '@/interfaces/api-service.interface';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Image as _Image, Scenario as _Scenario } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CategorySummary } from './category.response';
import { Image } from './image.response';

export class ScenarioSummary implements Pick<
  _Scenario,
  'id' | 'name' | 'assistantId' | 'description' | 'imageId' | 'published'
> {
  @IsInt()
  id!: number;
  @IsString()
  name!: string;
  @IsString()
  @IsNullable()
  @IsOptional()
  description!: string | null;
  @IsString()
  assistantId!: string;
  @IsNullable()
  @IsInt()
  imageId!: number | null;
  @IsBoolean()
  published!: boolean;
}

export class Scenario implements _Scenario {
  @IsInt()
  id!: number;
  @IsString()
  name!: string;
  @IsString()
  @IsNullable()
  @IsOptional()
  description!: string | null;
  @IsString()
  assistantId!: string;
  @IsNullable()
  @IsInt()
  imageId!: number | null;
  @IsNullable()
  @IsInt()
  categoryId!: number | null;
  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  image?: _Image;
  @IsOptional()
  @ValidateNested()
  @Type(() => CategorySummary)
  category?: CategorySummary;
  @IsBoolean()
  published!: boolean;
  @IsDateString()
  createdAt!: Date;
  @IsDateString()
  updatedAt!: Date;
}

export class ScenariosApiResponse implements ApiResponse<Scenario[]> {
  @ValidateNested({ each: true })
  @Type(() => Scenario)
  data!: Scenario[];
  @IsString()
  message!: string;
}
export class ScenarioApiResponse implements ApiResponse<Scenario> {
  @ValidateNested()
  @Type(() => Scenario)
  data!: Scenario;
  @IsString()
  message!: string;
}

export class ScenarioDeleteApiResponse implements ApiResponse<boolean> {
  @IsBoolean()
  data!: boolean;
  @IsString()
  message!: string;
}
