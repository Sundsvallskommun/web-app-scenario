import { HttpException } from '@exceptions/HttpException';
import ApiResponse from '@interfaces/api-service.interface';
import { RequestWithUser } from '@interfaces/auth.interface';
import adminMiddleware from '@middlewares/admin.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import {
  ExternalUser,
  ExternalUserApiResponse,
  ExternalUsersApiResponse,
  ExternalUserDeleteApiResponse,
} from '@/responses/admin/external-user.response';
import { logger } from '@utils/logger';
import prisma from '@utils/prisma';
import { Response } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseBefore } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';
import { CreateExternalUserDto, UpdateExternalUserDto } from '@dtos/external-user.dto';

const externalUserInclude = {
  categories: {
    select: {
      category: {
        select: {
          id: true,
          name: true,
          imageId: true,
        },
      },
    },
    orderBy: {
      categoryId: 'asc' as const,
    },
  },
};

const formatExternalUserResponse = <
  T extends {
    categories?: Array<{
      category: {
        id: number;
        name: string;
        imageId: number | null;
      };
    }>;
  },
>(
  externalUser: T,
) => ({
  ...externalUser,
  categories: externalUser.categories?.map(({ category }) => category) ?? [],
});

@Controller()
@UseBefore(authMiddleware)
@UseBefore(adminMiddleware)
export class AdminExternalUserController {
  @Get('/admin/external-users')
  @ResponseSchema(ExternalUsersApiResponse)
  async getExternalUsers(
    @Req() req: RequestWithUser,
    @Res() response: Response<ApiResponse<ExternalUser[]>>,
  ): Promise<Response<ApiResponse<ExternalUser[]>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.externalUser.findMany({
        include: externalUserInclude,
      });

      return response.send({ data: data.map(formatExternalUserResponse), message: 'success' });
    } catch (error) {
      logger.error('Error getting external users', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Get('/admin/external-user/:id')
  @ResponseSchema(ExternalUserApiResponse)
  async getExternalUser(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<ExternalUser>>,
  ): Promise<Response<ApiResponse<ExternalUser>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.externalUser.findFirst({
        where: { id: id },
        include: externalUserInclude,
      });

      const formattedData = data ? formatExternalUserResponse(data) : data;

      return response.send({ data: formattedData as unknown as ExternalUser, message: 'success' });
    } catch (error) {
      logger.error('Error getting external user', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Post('/admin/external-user')
  @ResponseSchema(ExternalUserApiResponse)
  async addExternalUser(
    @Req() req: RequestWithUser,
    @Body() body: CreateExternalUserDto,
    @Res() response: Response<ApiResponse<ExternalUser>>,
  ): Promise<Response<ApiResponse<ExternalUser>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }
    try {
      const categoryIds = body.categoryIds ?? [];
      const externalUserResponse = await prisma.externalUser.create({
        data: {
          name: body.name,
          org: body.org,
          personNumber: body.personNumber,
          categories: {
            create: categoryIds.map(categoryId => ({
              category: {
                connect: { id: categoryId },
              },
            })),
          },
        },
        include: externalUserInclude,
      });
      return response.send({ message: 'success', data: formatExternalUserResponse(externalUserResponse) });
    } catch (error) {
      logger.error('Error saving external user', error);
      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Patch('/admin/external-user/:id')
  @ResponseSchema(ExternalUserApiResponse)
  async updateExternalUser(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body() body: UpdateExternalUserDto,
    @Res() response: Response<ApiResponse<ExternalUser>>,
  ): Promise<Response<ApiResponse<ExternalUser>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.externalUser.update({
        where: { id },
        data: {
          name: body.name,
          personNumber: body.personNumber,
          org: body.org,
          categories:
            body.categoryIds !== undefined
              ? {
                  deleteMany: {},
                  create: body.categoryIds.map(categoryId => ({
                    category: {
                      connect: { id: categoryId },
                    },
                  })),
                }
              : undefined,
        },
        include: externalUserInclude,
      });

      return response.send({ message: 'success', data: formatExternalUserResponse(data) });
    } catch (error) {
      logger.error('Error updating external user', error);
      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Delete('/admin/external-user/:id')
  @ResponseSchema(ExternalUserDeleteApiResponse)
  async deleteExternalUser(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<boolean>>,
  ): Promise<Response<ApiResponse<boolean>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const foundExternalUser = await prisma.externalUser.findFirst({
        where: { id: id },
      });

      if (!foundExternalUser) {
        logger.error('Error deleting external user');
        throw new HttpException(500, 'Internal Server Error');
      }

      await prisma.externalUser.delete({
        where: { id },
      });

      return response.send({ data: true, message: 'success' });
    } catch (error) {
      logger.error('Error deleting external user', error);
      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }
}
