import { Image } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateImageDto implements Partial<Image> {
  @IsOptional()
  @IsString()
  name?: string;
}
