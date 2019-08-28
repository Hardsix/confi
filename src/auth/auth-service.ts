import { Request } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { UserModel } from 'src/user/user-model';
import { AppConfig } from '../shared/config/config';
import userService from '../user/user-service';
import { AUTH_TYPE, JWT_TYPE } from './const';
import { UnauthorizedException } from '@nestjs/common';

const bearerTokenRegex = /Bearer (.*)/;
const basicAuthRegex = /Basic (.*)/;

export class AuthContext {
  user: UserModel;
  type: AUTH_TYPE;
  subType: JWT_TYPE | undefined;
}

export class AuthService {
  generateToken(tokenType: JWT_TYPE, username: string, secret: string = AppConfig.jwtSecret): string {
    const user = userService.getByUsername(username);

    const payload = {
      userId: user.id,
      username: user.username,
      type: tokenType,
    };

    const duration = tokenType === JWT_TYPE.ACCESS ?
      AppConfig.jwtAccessDuration : AppConfig.jwtRefreshDuration;

    const token = jwt.sign(payload, secret, {
      expiresIn: duration,
    });

    return token;
  }

  getAuthContext(req: Request): AuthContext | null {
    const authRaw = req.headers.authorization;
    if (!authRaw) {
      return null;
    }

    const bearerMatch = authRaw.match(bearerTokenRegex);
    if (bearerMatch) {
      const tokenValue = bearerMatch[1];
      
      let token;
      try {
        token = jwt.verify(tokenValue, AppConfig.jwtSecret);
      } catch (err) {
        throw new UnauthorizedException();
      }

      const userId = token.userId;
      const user = userService.getById(userId);

      return {
        user,
        type: AUTH_TYPE.JWT,
        subType: token.type,
      };
    }

    const basicMatch = authRaw.match(basicAuthRegex);
    if (basicMatch) {
      const basicValue = basicMatch[1];
      const [username, password] = _.split(
        Buffer.from(basicValue, 'base64').toString(),
        ':',
      );

      if (!userService.areCredentialsValid(username, password)) {
        return null;
      }

      const user = userService.getByUsername(username);

      return {
        user,
        type: AUTH_TYPE.BASIC,
        subType: undefined, // unnecessary, but keeps TS happy
      };
    }

    return null;
  }
}

export default new AuthService();
