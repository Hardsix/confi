import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthContext } from './auth-service';
import { AUTH_TYPE, JWT_TYPE } from './const';

export class IsAuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authContext: AuthContext = request['authContext'];

    return !!authContext;
  }
}
