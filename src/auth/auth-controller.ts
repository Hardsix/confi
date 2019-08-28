import { Body, Controller, Post, Req, UnauthorizedException, } from '@nestjs/common';
import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { JWT_TYPE } from './const';
import authService from './auth-service';
import { UserModel } from 'src/user/user-model';

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


@Controller('auth')
export default class AuthController {
  @Post('/token')
  @ApiResponse({ type: TokenResponseDto, status: 201 })
  async login(@Body() data: TokenRequestDto, @Req() request: Request): Promise<TokenResponseDto> {
    const user: UserModel = request['user'];
    if (!user) {
      throw new UnauthorizedException();
    }

    const tokenType = data.tokenType;
    const token = authService.generateToken(data.tokenType, user.username);
    return {
      token,
      tokenType,
    };
  }
}
