import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import { ScenarioIntroTextsApiResponse } from '@/responses/scenario-intro-text.response';
import { logger } from '@/utils/logger';
import prisma from '@/utils/prisma';
import { Response } from 'express';
import { Controller, Get, Req, Res, UseBefore } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

@Controller()
@UseBefore(authMiddleware)
export class ScenarioIntroTextController {
  @Get('/scenario-intro-texts')
  @ResponseSchema(ScenarioIntroTextsApiResponse)
  async getScenarioIntroTexts(
    @Req() req: RequestWithUser,
    @Res() response: Response<ScenarioIntroTextsApiResponse>,
  ): Promise<Response<ScenarioIntroTextsApiResponse>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.scenarioIntroText.findMany({
        select: { id: true, text: true, sortOrder: true },
        orderBy: { sortOrder: 'asc' },
      });

      return response.send({ data, message: 'success' });
    } catch (error) {
      logger.error('Error getting scenario intro texts', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }
}
