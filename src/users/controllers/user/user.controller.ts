import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  Query,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { Request, Response } from 'express'; // Import Request and Response types
import { UserService } from 'src/users/services/user/user.service';

@ApiBearerAuth()
@Controller('api/user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/dashboard')
  @ApiTags('User')
  @ApiOperation({ summary: 'Get User Dashboard' })
  async getDashboard(@Query() query,@Req() req: Request, @Res() response: Response) {
    const user = req.user;
    const result = await this.userService.getUserDashboard(user);
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

}
