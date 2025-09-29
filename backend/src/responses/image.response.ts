import { Image as _Image } from '@prisma/client';
import { IsString } from 'class-validator';

export class PublicImage implements Pick<_Image, 'url'> {
  @IsString()
  url: string;
}
