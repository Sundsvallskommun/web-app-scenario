import ApiResponse from '@/interfaces/api-service.interface';
import { Image as _Image } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Scenario } from './scenario.response';

export class Image implements _Image {
  @IsString()
  name: string;
  @IsString()
  filename: string;
  @IsString()
  url: string;
  @IsInt()
  id: number;
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Scenario)
  scenarios?: Scenario[];
  @IsDateString()
  createdAt: Date;
  @IsDateString()
  updatedAt: Date;
}

export class ImagesApiResponse implements ApiResponse<_Image[]> {
  @ValidateNested({ each: true })
  @Type(() => Image)
  data: _Image[];
  @IsString()
  message: string;
}

export class ImageApiResponse implements ApiResponse<_Image> {
  @ValidateNested()
  @Type(() => Image)
  data: _Image;
  @IsString()
  message: string;
}

export class ImageDeleteApiResponse implements ApiResponse<boolean> {
  @IsBoolean()
  data: boolean;
  @IsString()
  message: string;
}
