import ApiResponse from '@/interfaces/api-service.interface';
import { IsNullable } from '@/utils/custom-validation-classes';
import { Category as _Category, Image as _Image } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Image } from './image.response';

export class CategorySummary implements Pick<_Category, 'id' | 'name' | 'imageId'> {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsNullable()
  @IsInt()
  imageId: number | null;
}

export class Category implements _Category {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsNullable()
  @IsInt()
  imageId: number | null;

  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  image?: _Image;

  @IsArray()
  @IsString({ each: true })
  adGroups: string[];

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;
}

export class CategoriesApiResponse implements ApiResponse<Category[]> {
  @ValidateNested({ each: true })
  @Type(() => Category)
  data: Category[];

  @IsString()
  message: string;
}

export class CategoryApiResponse implements ApiResponse<Category> {
  @ValidateNested()
  @Type(() => Category)
  data: Category;

  @IsString()
  message: string;
}

export class CategoryDeleteApiResponse implements ApiResponse<boolean> {
  @IsBoolean()
  data: boolean;

  @IsString()
  message: string;
}
