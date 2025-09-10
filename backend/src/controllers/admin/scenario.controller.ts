import { CreateScenarioDto, UpdateScenarioDto } from '@/dtos/scenario.dto';
import { HttpException } from '@/exceptions/HttpException';
import ApiResponse from '@/interfaces/api-service.interface';
import { RequestWithUser } from '@/interfaces/auth.interface';
import adminMiddleware from '@/middlewares/admin.middleware';
import authMiddleware from '@/middlewares/auth.middleware';
import {
  ScenarioApiResponse,
  ScenarioDeleteApiResponse,
  ScenariosApiResponse,
} from '@/responses/admin/scenario.response';
import { logger } from '@/utils/logger';
import prisma from '@/utils/prisma';
import { Scenario } from '@prisma/client';
import { Response } from 'express';
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseBefore } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

@Controller()
@UseBefore(authMiddleware)
@UseBefore(adminMiddleware)
export class AdminScenarioController {
  @Get('/admin/scenarios')
  @ResponseSchema(ScenariosApiResponse)
  async getScenarios(
    @Req() req: RequestWithUser,
    @Res() response: Response<ApiResponse<Scenario[]>>,
  ): Promise<Response<ApiResponse<Scenario[]>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.scenario.findMany({
        include: { image: true },
      });

      return response.send({ data, message: 'success' });
    } catch (error) {
      logger.error('Error getting scenarios', error);

      throw new HttpException(error?.code ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Get('/admin/scenarios/:id')
  @ResponseSchema(ScenarioApiResponse)
  async getScenario(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<Scenario>>,
  ): Promise<Response<ApiResponse<Scenario>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const data = await prisma.scenario.findFirst({
        where: { id },
        include: { image: true },
      });

      return response.send({ data, message: 'success' });
    } catch (error) {
      logger.error('Error getting scenario', error);

      throw new HttpException(error?.code ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Post('/admin/scenarios')
  @ResponseSchema(ScenarioApiResponse)
  async createScenario(
    @Req() req: RequestWithUser,
    @Body() body: CreateScenarioDto,
    @Res() response: Response<ApiResponse<Scenario>>,
  ): Promise<Response<ApiResponse<Scenario>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const scenarioResponse = await prisma.scenario.create({
        data: {
          name: body.name,
          description: body.description ?? null,
          published: body.published ?? false,
          assistantId: body.assistantId,
          image:
            typeof body?.imageId === 'number'
              ? {
                  connect: { id: body.imageId },
                }
              : undefined,
        },
        include: {
          image: true,
        },
      });

      return response.send({ message: 'success', data: scenarioResponse });
    } catch (error) {
      logger.error('Error creating scenario', error);
      throw new HttpException(error?.code ?? 500, error?.message ?? 'Internal Server Error');
    }
  }
  @Patch('/admin/scenarios/:id')
  @ResponseSchema(ScenarioApiResponse)
  async updateScenario(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body() body: UpdateScenarioDto,
    @Res() response: Response<ApiResponse<Scenario>>,
  ): Promise<Response<ApiResponse<Scenario>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      const scenarioResponse = await prisma.scenario.update({
        where: { id },
        data: {
          name: body.name,
          description: body.description,
          published: body.published,
          assistantId: body.assistantId,
          image:
            typeof body?.imageId === 'number'
              ? {
                  connect: { id: body.imageId },
                }
              : undefined,
        },
        include: {
          image: true,
        },
      });

      return response.send({ message: 'success', data: scenarioResponse });
    } catch (error) {
      logger.error('Error updating scenario', error);
      throw new HttpException(error?.code ?? 500, error?.message ?? 'Internal Server Error');
    }
  }

  @Delete('/admin/scenarios/:id')
  @ResponseSchema(ScenarioDeleteApiResponse)
  async deleteScenario(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Res() response: Response<ApiResponse<boolean>>,
  ): Promise<Response<ApiResponse<boolean>>> {
    if (!req.user) {
      throw new HttpException(400, 'Bad Request');
    }

    try {
      await prisma.scenario.delete({
        where: { id },
      });

      return response.send({ data: true, message: 'success' });
    } catch (error) {
      logger.error('Error deleting scenario', error);

      throw new HttpException(error?.code ?? 500, error?.message ?? 'Internal Server Error');
    }
  }
}
