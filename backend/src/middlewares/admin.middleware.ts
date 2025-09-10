import { InternalRoleEnum, RequestWithUser } from '@/interfaces/auth.interface';
import { logger } from '@/utils/logger';
import { HttpException } from '@exceptions/HttpException';
import { NextFunction, Response } from 'express';

const adminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.isAuthenticated() && req.user.role === InternalRoleEnum.app_admin) {
      next();
    } else {
      next(new HttpException(401, 'NOT_AUTHORIZED'));
    }
  } catch (error) {
    logger.error('Error in admin middleware', error);
    next(new HttpException(401, 'AUTH_FAILED'));
  }
};

export default adminMiddleware;
