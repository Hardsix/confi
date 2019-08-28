import { Body, Controller, ForbiddenException, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import authService, { AuthContext } from './auth-service';
import { AUTH_TYPE, JWT_TYPE } from './const';
import { IsAuthenticatedGuard } from './is-authenticated-guard';

export class TokenRequestDto {
  @ApiModelProperty()
  tokenType: JWT_TYPE;
}

export class TokenResponseDto {
  @ApiModelProperty()
  token: string;

  @ApiModelProperty()
  tokenType: JWT_TYPE;
}

function mayGenerateToken(req: Request, tokenType: JWT_TYPE): boolean {
  const authContext: AuthContext = req['authContext'];

  // basic auth may generate refresh token
  if (tokenType === JWT_TYPE.REFRESH && authContext.type === AUTH_TYPE.BASIC) {
    return true;
  }

  // refresh token may generate access token
  if (tokenType === JWT_TYPE.ACCESS &&
    authContext.type === AUTH_TYPE.JWT &&
    authContext.subType === JWT_TYPE.REFRESH) {
    return true;
  }

  return false;
}

@UseGuards(IsAuthenticatedGuard)
@Controller('auth')
export default class AuthController {
  @Post('/token')
  @ApiResponse({ type: TokenResponseDto, status: 201 })
  async login(@Body() data: TokenRequestDto, @Req() request: Request): Promise<TokenResponseDto> {
    const authContext: AuthContext = request['authContext'];

    if (!mayGenerateToken(request, data.tokenType)) {
      throw new ForbiddenException();
    }

    const tokenType = data.tokenType;
    const user = authContext.user;
    const token = authService.generateToken(data.tokenType, user.username);

    return {
      token,
      tokenType,
    };
  }
}
