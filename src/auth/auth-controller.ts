import { Body, Controller, NotFoundException, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ApiModelProperty, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import userService from '../user/user-service';
import authService from './auth-service';

export class LoginDto {
  @ApiModelProperty()
  username: string;

  @ApiModelProperty()
  password: string;
}

export class LoginResponseDto {
  @ApiModelProperty()
  accessToken: string;
}

@Controller('login')
export default class AuthController {
  @Post()
  @ApiResponse({ type: LoginResponseDto, status: 201 })
  async login(@Body() data: LoginDto, @Req() request: Request): Promise<LoginResponseDto> {
    const credentialsValid = userService.areCredentialsValid(data.username, data.password);
    if (!credentialsValid) {
      throw new UnauthorizedException();
    }

    const accessToken = authService.generateToken(data.username);
    return {
      accessToken,
    };
  }
}
