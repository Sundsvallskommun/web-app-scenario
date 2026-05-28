import { CreateCategoryDto, UpdateCategoryDto } from '@/dtos/category.dto';
import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import adminMiddleware from '@/middlewares/admin.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import {
  CategoriesApiResponse,
  Category,
  CategoryApiResponse,
  CategoryDeleteApiResponse,
} from '@/responses/admin/category.response';
import { logger } from '@/utils/logger';
import prisma from '@/utils/prisma';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseBefore } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

const sanitizeAdGroups = (adGroups?: string[]) =>
  (adGroups ?? []).map(group => group.trim()).filter(group => group.length > 0);

const formatCategoryResponse = <
  T extends {
    adGroups?: Array<{ value: string }>;
  },
>(
  category: T,
) => ({
  ...category,
  adGroups: category.adGroups?.map(group => group.value) ?? [],
});

const isUniqueNameError = (error: unknown) =>
  error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';

@Controller()
@UseBefore(authMiddleware)
@UseBefore(adminMiddleware)
export class AdminCategoryController {
  @Get('/admin/categories')
  @ResponseSchema(CategoriesApiResponse)
  async getCategories(
    @Req() req: RequestWithUser,
    @Res() response: Response<ApiResponse<Category[]>>,
  ): Promise<Response<ApiResponse<Category[]>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.category.findMany({
        include: {
          image: true,
          adGroups: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
      });

      return response.send({ data: data.map(formatCategoryResponse), message: 'success' });
    } catch (error: any) {
      logger.error('Error getting categories', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Get('/admin/categories/:id')
  @ResponseSchema(CategoryApiResponse)
  async getCategory(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<Category>>,
  ): Promise<Response<ApiResponse<Category>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.category.findFirst({
        where: { id },
        include: {
          image: true,
          adGroups: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
      });

      const formattedData = data ? formatCategoryResponse(data) : data;
      if (!formattedData) {
        throw new HttpException(404, 'Could not find category');
      }
      return response.send({ data: formattedData as unknown as Category, message: 'success' });
    } catch (error: any) {
      logger.error('Error getting category', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Post('/admin/categories')
  @ResponseSchema(CategoryApiResponse)
  async createCategory(
    @Req() req: RequestWithUser,
    @Body() body: CreateCategoryDto,
    @Res() response: Response<ApiResponse<Category>>,
  ): Promise<Response<ApiResponse<Category>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    const adGroups = sanitizeAdGroups(body.adGroups);

    try {
      const categoryResponse = await prisma.category.create({
        data: {
          name: body.name,
          image:
            typeof body.imageId === 'number'
              ? {
                  connect: { id: body.imageId },
                }
              : undefined,
          adGroups: {
            create: adGroups.map((value, index) => ({
              value,
              sortOrder: index,
            })),
          },
        },
        include: {
          image: true,
          adGroups: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
      });

      return response.send({ message: 'success', data: formatCategoryResponse(categoryResponse) });
    } catch (error: any) {
      logger.error('Error creating category', error);

      if (isUniqueNameError(error)) {
        throw new HttpException(409, 'Category name must be unique');
      }

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Patch('/admin/categories/:id')
  @ResponseSchema(CategoryApiResponse)
  async updateCategory(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body() body: UpdateCategoryDto,
    @Res() response: Response<ApiResponse<Category>>,
  ): Promise<Response<ApiResponse<Category>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    const adGroups = body.adGroups !== undefined ? sanitizeAdGroups(body.adGroups) : undefined;

    try {
      const categoryResponse = await prisma.category.update({
        where: { id },
        data: {
          name: body.name,
          image:
            typeof body.imageId === 'number'
              ? {
                  connect: { id: body.imageId },
                }
              : { disconnect: true },
          adGroups:
            adGroups !== undefined
              ? {
                  deleteMany: {},
                  create: adGroups.map((value, index) => ({
                    value,
                    sortOrder: index,
                  })),
                }
              : undefined,
        },
        include: {
          image: true,
          adGroups: {
            orderBy: {
              sortOrder: 'asc',
            },
          },
        },
      });

      return response.send({ message: 'success', data: formatCategoryResponse(categoryResponse) });
    } catch (error: any) {
      logger.error('Error updating category', error);

      if (isUniqueNameError(error)) {
        throw new HttpException(409, 'Category name must be unique');
      }

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Delete('/admin/categories/:id')
  @ResponseSchema(CategoryDeleteApiResponse)
  async deleteCategory(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<boolean>>,
  ): Promise<Response<ApiResponse<boolean>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const category = await prisma.category.findFirst({
        where: { id },
        include: {
          scenarios: true,
        },
      });

      if (category?.scenarios && category.scenarios.length > 0) {
        throw new HttpException(409, 'Category is in use');
      }

      await prisma.category.delete({
        where: { id },
      });

      return response.send({ data: true, message: 'success' });
    } catch (error: any) {
      logger.error('Error deleting category', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }
}
