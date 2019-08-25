import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppConfig } from '../shared/config/config';
import userService from '../user/user-service';

const tokenRegex = /Bearer (.*)/;

function extractToken(req: Request) {
  const tokenRaw = req.headers.authorization;
  if (!tokenRaw) {
    return null;
  }

  const match = tokenRaw.match(tokenRegex);
  if (!match) {
    return null;
  }

  return match[1];
}

export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    const token = extractToken(req);
    if (!token) {
      return next();
    }

    const decodedToken = jwt.verify(token, AppConfig.jwtSecret);
    const userId = decodedToken.userId;

    const user = userService.getById(userId);
    if (!user) {
      return next();
    }

    req['user'] = user;

    next();
  }
}
