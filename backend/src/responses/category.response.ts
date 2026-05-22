import ApiResponse from '@/interfaces/api-service.interface';
import { Category as _Category } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PublicImage } from './image.response';

export class PublicCategory implements Pick<_Category, 'id' | 'name'> {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PublicImage)
  image?: PublicImage;
}

export class PublicCategoriesApiResponse implements ApiResponse<PublicCategory[]> {
  @ValidateNested({ each: true })
  @Type(() => PublicCategory)
  data: PublicCategory[];

  @IsString()
  message: string;
}
