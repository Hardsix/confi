import jwt from 'jsonwebtoken';
import { AppConfig } from '../shared/config/config';
import userService from '../user.module/user-service';

export class AuthService {
  generateToken(username: string): string {
    const user = userService.getByUsername(username);

    const payload = {
      userId: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, AppConfig.jwtSecret, {
      expiresIn: '3 days',
      subject: user.id,
    });

    return token;
  }
}

export default new AuthService();
