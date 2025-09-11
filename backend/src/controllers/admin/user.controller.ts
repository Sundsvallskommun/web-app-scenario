import { HttpException } from '@/exceptions/HttpException';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import adminMiddleware from '@/middlewares/admin.middleware';
import { AdminUserApiResponse } from '@/responses/admin/user.response';
import authMiddleware from '@middlewares/auth.middleware';
import { Response } from 'express';
import { Controller, Get, Req, Res, UseBefore } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@Controller()
@UseBefore(authMiddleware)
@UseBefore(adminMiddleware)
export class AdminUserController {
  @Get('/admin/me')
  @OpenAPI({
    summary: 'Return current user',
  })
  @ResponseSchema(AdminUserApiResponse)
  async getUser(@Req() req: RequestWithUser, @Res() response: Response): Promise<Response<User>> {
    const { user } = req;

    if (!user.name) {
      throw new HttpException(400, 'Bad Request');
    }

    return response.send({ data: user, message: 'success' });
  }
}
