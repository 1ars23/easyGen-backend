import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { User } from 'src/schemas/User.schema';
import { loginDto } from 'src/authentication/dtos/login.dto';
import { RegisterDto } from 'src/authentication/dtos/Register.dto';
dotenv.config();

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUsers(userDetails: RegisterDto) {
    try {
      const { user_name, email, password } = userDetails;

      const emailCheck = await this.userModel.findOne({
        email: email,
      });
      if (emailCheck) {
        return {
          status: false,
          message: ['Email Already Exists'],
          body: {},
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new this.userModel({
        user_name,
        email,
        password: hashedPassword,
        active: '1',
      });
      await newUser.save();

      const mappedUserData = {
        id: newUser._id,
        user_name: newUser.user_name,
        email: newUser.email,
      };
      return {
        status: true,
        message: ['User Registered Successfully'],
        body: {
          user: mappedUserData,
        },
      };
    } catch (error) {
      // Handle any errors that might occur during the query
      console.log(error, 'error');
      return {
        status: false,
        message: ['Error Registering User'],
        body: {},
        error: error.message,
      };
    }
  }

  async loginUser(req: loginDto) {
    try {
      const email = req.email;
      const password = req.password;
      const escapedEmail = email.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
      const user = await this.userModel
        .findOne({ email: new RegExp('^' + escapedEmail + '$', 'i') })
        .exec();

      if (!user) {
        return {
          status: false,
          message: ['No User Found'],
          body: {},
        };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return {
          status: false,
          message: ['Invalid Password'],
          body: {},
        };
      }

      const accessToken = await this.generateAccessToken({
        id: user._id,
        username: user.user_name,
        email: user.email,
      });

      return {
        status: true,
        message: ['Login Successfully'],
        body: {
          access_token: accessToken,
        },
      };
    } catch (error) {
      // Handle any errors that might occur during the query
      console.log(error, 'error');
      return {
        status: false,
        message: [error.message],
        body: {},
      };
    }
  }

  async generateAccessToken(data) {
    try {
      // encryption key
      const encryptionKey = process.env.ACCESS_JWT_ENCRYPTION_KEY;

      // Generate a random IV
      const iv = crypto.randomBytes(16);
      // Create the cipher with the generated IV
      const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        Buffer.from(encryptionKey, 'hex'),
        iv,
      );
      let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex');
      encryptedData += cipher.final('hex');

      // Use the IV in  JWT payload
      const accessToken = this.jwtService.sign({
        encryptedData,
        iv: iv.toString('hex'),
      });
      return accessToken;
    } catch (error) {
      throw new BadRequestException('Invalid Token', {
        cause: new Error(),
        description: 'Invalid Token',
      });
    }
  }
}
