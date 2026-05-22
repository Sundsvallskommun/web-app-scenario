import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { PublicCategoriesApiResponse } from '@/responses/category.response';
import { getAllowedCategoryWhere } from '@/services/public-access.service';
import { logger } from '@/utils/logger';
import prisma from '@/utils/prisma';
import { Response } from 'express';
import { Controller, Get, Req, Res, UseBefore } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

@Controller()
@UseBefore(authMiddleware)
export class CategoryController {
  @Get('/categories')
  @ResponseSchema(PublicCategoriesApiResponse)
  async getCategories(
    @Req() req: RequestWithUser,
    @Res() response: Response<PublicCategoriesApiResponse>,
  ): Promise<Response<PublicCategoriesApiResponse>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const accessWhere = await getAllowedCategoryWhere(req.user);
      const data = await prisma.category.findMany({
        where: accessWhere,
        select: {
          id: true,
          name: true,
          image: {
            select: {
              url: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      });

      return response.send({ data, message: 'success' });
    } catch (error) {
      logger.error('Error getting categories', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }
}
