import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import authService from './auth-service';

export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    const authContext = authService.getAuthContext(req);
    if (!authContext || !authContext.user) {
      return next();
    }

    req['authContext'] = authContext;

    next();
  }
}
