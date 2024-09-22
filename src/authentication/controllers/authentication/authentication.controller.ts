import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthenticationService } from 'src/authentication/services/authentication/authentication.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import {
  LogoutApiBadRequestResponse,
  LogoutApiInternalServerErrorResponse,
  LogoutApiResponse,
} from 'src/authentication/swagger/logout-swagger';
import * as dotenv from 'dotenv'; // to delete
import { LogService } from 'src/log/services/log/log.service';
import { UserService } from 'src/users/services/user/user.service';
import {
  RegisterApiBadRequestResponse,
  RegisterApiInternalServerErrorResponse,
  RegisterApiResponse,
} from 'src/authentication/swagger/register-swagger';
import { LoginApiResponse } from 'src/authentication/swagger/login-swagger';
import { loginDto } from 'src/authentication/dtos/login.dto';
import { RegisterDto } from 'src/authentication/dtos/Register.dto';
dotenv.config(); // to delete
@ApiBearerAuth()
@Controller('api')
export class AuthenticationController {
  constructor(
    private authService: AuthenticationService,
  ) {}

  @Post('/register')
  @ApiTags('Auth')
  @ApiOperation({ summary: 'User Registration' })
  @RegisterApiResponse
  @RegisterApiBadRequestResponse
  @RegisterApiInternalServerErrorResponse
  async createUser(
    @Body() userData: RegisterDto,
    @Req() req: Request,
    @Res() response: Response,
  ) {
    const result = await this.authService.createUsers(userData);
    if (!result.status) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.message,
        body: result.body,
      });
    }
    return response.status(HttpStatus.OK).json({
      message: result.message,
      body: result.body,
    });
  }

  @Post('login')
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Login' })
  @LoginApiResponse
  async login(@Body() req: loginDto, @Res() response: Response) {
    
    const result = await this.authService.loginUser(req);
    if (!result.status) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: result.message,
        body: result.body,
      });
    }
    return response.status(HttpStatus.OK).json({
      message: result.message,
      body: result.body,
    });
  }

  @Post('logout')
  @ApiTags('Auth')
  @ApiOperation({ summary: 'Logout User' })
  @LogoutApiResponse
  @LogoutApiBadRequestResponse
  @LogoutApiInternalServerErrorResponse
  async logout(@Req() req: Request, @Res() response: Response) {
    return response.status(HttpStatus.OK).json({
      message: 'Logout Successfull',
      body: {},
    });
  }

}
