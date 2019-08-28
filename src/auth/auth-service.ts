import jwt from 'jsonwebtoken';
import { AppConfig } from '../shared/config/config';
import userService from '../user/user-service';
import { JWT_TYPE } from './const';

export class AuthService {
  generateToken(tokenType: JWT_TYPE, username: string): string {
    const user = userService.getByUsername(username);

    const payload = {
      userId: user.id,
      username: user.username,
      type: tokenType,
    };

    const duration = tokenType === JWT_TYPE.ACCESS ?
      AppConfig.jwtAccessDuration : AppConfig.jwtRefreshDuration;

    const token = jwt.sign(payload, AppConfig.jwtSecret, {
      expiresIn: duration,
    });

    return token;
  }
}

export default new AuthService();
