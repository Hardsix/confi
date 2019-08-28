import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppConfig } from '../shared/config/config';
import userService from '../user/user-service';
import { JWT_TYPE } from './const';

const bearerTokenRegex = /Bearer (.*)/;
const basicAuthRegex = /Basic (.*)/;

enum AUTH_TYPE {
  JWT='jwt',
  BASIC='basic',
};

function extractToken(req: Request) {
  const tokenRaw = req.headers.authorization;
  if (!tokenRaw) {
    return null;
  }

  const bearerMatch = tokenRaw.match(bearerTokenRegex);
  if (bearerMatch) {
    return {
      value: bearerMatch[1],
      type: AUTH_TYPE.JWT,
    };
  }

  const basicMatch = tokenRaw.match(basicAuthRegex);
  if (basicMatch) {
    return {
      value: basicMatch[1],
      type: AUTH_TYPE.BASIC,
    };
  }

  return null;
}

function resolveUser(req: Request) {
  const data = extractToken(req);

  if (!data) {
    return null;
  }

  if (data.type === AUTH_TYPE.JWT) {
    const decodedToken = jwt.verify(data.value, AppConfig.jwtSecret);
    console.log(decodedToken);
    const userId = decodedToken.userId;
    const user = userService.getById(userId);

    return {
      user,
      authType: decodedToken.type === JWT_TYPE.ACCESS ?
        AUTH_TYPE.
    };
  }

  if (data.type === AUTH_TYPE.BASIC) {
    const decoded = Buffer.from(data.value, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');

    const credsValid = userService.areCredentialsValid(username, password);

    return credsValid ? userService.getByUsername(username) : null;
  }

  return null;
}

export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    const token = extractToken(req);
    if (!token) {
      return next();
    }

    const user = resolveUser(req);
    if (!user) {
      return next();
    }

    req['user'] = user;

    next();
  }
}
