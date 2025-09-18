import { UpdateImageDto } from '@/dtos/image.dto';
import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import adminMiddleware from '@/middlewares/admin.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import { ImageApiResponse, ImageDeleteApiResponse, ImagesApiResponse } from '@/responses/admin/image.response';
import { fileUploadOptions } from '@/utils/fileUploadOptions';
import { logger } from '@/utils/logger';
import prisma from '@/utils/prisma';
import { dataDir, dataPath } from '@/utils/util';
import { Image } from '@prisma/client';
import { Response } from 'express';
import { unlink } from 'fs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseBefore,
} from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

@Controller()
@UseBefore(authMiddleware)
@UseBefore(adminMiddleware)
export class AdminImageController {
  @Get('/admin/images')
  @ResponseSchema(ImagesApiResponse)
  async getImages(
    @Req() req: RequestWithUser,
    @Res() response: Response<ApiResponse<Image[]>>,
  ): Promise<Response<ApiResponse<Image[]>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.image.findMany();

      return response.send({ data, message: 'success' });
    } catch (error) {
      logger.error('Error getting images', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Get('/admin/images/:id')
  @ResponseSchema(ImageApiResponse)
  async getImage(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<Image>>,
  ): Promise<Response<ApiResponse<Image>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.image.findFirst({
        where: { id },
        include: { scenarios: true },
      });

      return response.send({ data, message: 'success' });
    } catch (error) {
      logger.error('Error getting image', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Post('/admin/images')
  @ResponseSchema(ImageApiResponse)
  async createImage(
    @Req() req: RequestWithUser,
    @UploadedFile('image', { options: fileUploadOptions, required: true })
    image: Express.Multer.File,
    @Res() response: Response<ApiResponse<Image>>,
  ): Promise<Response<ApiResponse<Image>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }
    try {
      const imageResponse = await prisma.image.create({
        data: {
          name: image.originalname,
          filename: image.filename,
          url: `${dataPath(image.filename)}`,
        },
      });
      return response.send({ message: 'success', data: imageResponse });
    } catch (error) {
      logger.error('Error saving image', error);
      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Patch('/admin/images/:id')
  @ResponseSchema(ImageApiResponse)
  async updateImage(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body() body: UpdateImageDto,
    @Res() response: Response<ApiResponse<Image>>,
  ): Promise<Response<ApiResponse<Image>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.image.update({
        where: { id },
        data: {
          name: body.name,
        },
      });

      return response.send({ message: 'success', data });
    } catch (error) {
      logger.error('Error updating image', error);
      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Delete('/admin/images/:id')
  @ResponseSchema(ImageDeleteApiResponse)
  async deleteImage(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<boolean>>,
  ): Promise<Response<ApiResponse<boolean>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const image = await prisma.image.findFirst({
        where: { id },
        include: { scenarios: true },
      });

      if (image.scenarios && image.scenarios.length > 0) {
        throw new HttpException(409, 'Image is in use');
      }

      unlink(`${dataDir('uploads')}/${image.filename}`, err => {
        if (err) {
          logger.error('Error deleting image', err);
          throw new HttpException(500, 'Internal Server Error');
        }
      });

      await prisma.image.delete({
        where: { id },
      });

      return response.send({ data: true, message: 'success' });
    } catch (error) {
      logger.error('Error deleting image', error);
      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }
}
