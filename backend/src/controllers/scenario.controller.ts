import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { PublicScenarioApiResponse, PublicScenariosApiResponse } from '@/responses/scenario.response';
import { logger } from '@/utils/logger';
import prisma from '@/utils/prisma';
import { Response } from 'express';
import { Controller, Get, Param, Req, Res, UseBefore } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

@Controller()
@UseBefore(authMiddleware)
export class ScenarioController {
  @Get('/scenarios')
  @ResponseSchema(PublicScenariosApiResponse)
  async getScenarios(
    @Req() req: RequestWithUser,
    @Res() response: Response<PublicScenariosApiResponse>,
  ): Promise<Response<PublicScenariosApiResponse>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.scenario.findMany({
        select: { id: true, name: true, description: true, assistantId: true, image: { select: { url: true } } },
      });

      return response.send({ data, message: 'success' });
    } catch (error) {
      logger.error('Error getting scenarios', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Get('/scenarios/:id')
  @ResponseSchema(PublicScenarioApiResponse)
  async getScenario(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<PublicScenarioApiResponse>,
  ): Promise<Response<PublicScenarioApiResponse>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.scenario.findFirst({
        where: { id },
        select: { id: true, name: true, description: true, assistantId: true, image: { select: { url: true } } },
      });

      return response.send({ data, message: 'success' });
    } catch (error) {
      logger.error('Error getting scenario', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }
}
