import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async getUserDashboard(user: any) {
    try {
      const message = 'Welcome '+ user.user_name;
      return {
        status: true,
        message: [message],
        body: {
        },
      };
    } catch (error) {
      // Handle any errors that might occur during the query
      console.log(error, 'error');
      return {
        status: false,
        message: ['Error Getting Dashboard'],
        body: {},
        error: error.message,
      };
    }
  }

}
