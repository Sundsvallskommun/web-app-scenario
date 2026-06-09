import { CreateScenarioIntroTextDto, UpdateScenarioIntroTextDto } from '@/dtos/scenario-intro-text.dto';
import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import adminMiddleware from '@/middlewares/admin.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import {
  ScenarioIntroText,
  ScenarioIntroTextApiResponse,
  ScenarioIntroTextDeleteApiResponse,
  ScenarioIntroTextsApiResponse,
} from '@/responses/admin/scenario-intro-text.response';
import { logger } from '@/utils/logger';
import prisma from '@/utils/prisma';
import { Response } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseBefore } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

@Controller()
@UseBefore(authMiddleware)
@UseBefore(adminMiddleware)
export class AdminScenarioIntroTextController {
  @Get('/admin/scenario-intro-texts')
  @ResponseSchema(ScenarioIntroTextsApiResponse)
  async getScenarioIntroTexts(
    @Req() req: RequestWithUser,
    @Res() response: Response<ApiResponse<ScenarioIntroText[]>>,
  ): Promise<Response<ApiResponse<ScenarioIntroText[]>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.scenarioIntroText.findMany({
        orderBy: { sortOrder: 'asc' },
      });

      return response.send({ data, message: 'success' });
    } catch (error: any) {
      logger.error('Error getting scenario intro texts', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Get('/admin/scenario-intro-texts/:id')
  @ResponseSchema(ScenarioIntroTextApiResponse)
  async getScenarioIntroText(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<ScenarioIntroText>>,
  ): Promise<Response<ApiResponse<ScenarioIntroText>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.scenarioIntroText.findFirst({
        where: { id },
      });

      if (!data) {
        throw new HttpException(404, 'No intro text found');
      }

      return response.send({ data, message: 'success' });
    } catch (error: any) {
      logger.error('Error getting scenario intro text', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Post('/admin/scenario-intro-texts')
  @ResponseSchema(ScenarioIntroTextApiResponse)
  async createScenarioIntroText(
    @Req() req: RequestWithUser,
    @Body() body: CreateScenarioIntroTextDto,
    @Res() response: Response<ApiResponse<ScenarioIntroText>>,
  ): Promise<Response<ApiResponse<ScenarioIntroText>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.scenarioIntroText.create({
        data: {
          text: body.text,
          sortOrder: body.sortOrder,
        },
      });

      return response.send({ message: 'success', data });
    } catch (error: any) {
      logger.error('Error creating scenario intro text', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Patch('/admin/scenario-intro-texts/:id')
  @ResponseSchema(ScenarioIntroTextApiResponse)
  async updateScenarioIntroText(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body() body: UpdateScenarioIntroTextDto,
    @Res() response: Response<ApiResponse<ScenarioIntroText>>,
  ): Promise<Response<ApiResponse<ScenarioIntroText>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.scenarioIntroText.update({
        where: { id },
        data: {
          text: body.text,
          sortOrder: body.sortOrder,
        },
      });

      return response.send({ message: 'success', data });
    } catch (error: any) {
      logger.error('Error updating scenario intro text', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Delete('/admin/scenario-intro-texts/:id')
  @ResponseSchema(ScenarioIntroTextDeleteApiResponse)
  async deleteScenarioIntroText(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<boolean>>,
  ): Promise<Response<ApiResponse<boolean>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      await prisma.scenarioIntroText.delete({
        where: { id },
      });

      return response.send({ data: true, message: 'success' });
    } catch (error: any) {
      logger.error('Error deleting scenario intro text', error);

      throw new HttpException(error?.status ?? 500, error?.message ?? 'Internal Server Error');
    }
  }
}
