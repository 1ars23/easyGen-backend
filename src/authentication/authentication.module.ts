import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { AuthenticationService } from './services/authentication/authentication.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { User, UserSchema } from 'src/schemas/User.schema';
import { ErrorLog, ErrorLogSchema } from 'src/schemas/ErrorLog.schema';
import { LogService } from 'src/log/services/log/log.service';
import { UserService } from 'src/users/services/user/user.service';

dotenv.config();
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ErrorLog.name,
        schema: ErrorLogSchema,
      },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '5h' },
    }),
    PassportModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, LogService,UserService],
})
export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('api/logout');
  }
}
// export class AuthenticationModule{}