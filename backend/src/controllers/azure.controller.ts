import { AZURE_REGION } from '@/config';
import ApiResponse from '@/interfaces/api-service.interface';
import { Token } from '@/interfaces/azure.interface';
import { ApiResponseAzureToken } from '@/responses/azure.response';
import { getToken } from '@/services/azure.service';
import { logger } from '@/utils/logger';
import { Response } from 'express';
import { Controller, Get, HttpError, Res } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@Controller()
export class AzureController {
  @Get('/azure/login')
  @OpenAPI({
    summary: 'Get auth token for Azure Speech services',
  })
  @ResponseSchema(ApiResponseAzureToken)
  async getAzureToken(@Res() res: Response<ApiResponse<Token>>): Promise<Response<ApiResponse<Token>>> {
    try {
      const token: string = await getToken();
      const region = AZURE_REGION;
      return res.send({ data: { token, region }, message: 'success' });
    } catch (e) {
      logger.error('Error getting Azure token', e);
      throw new HttpError(500, 'Server error');
    }
  }
}
