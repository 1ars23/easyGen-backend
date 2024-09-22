import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/authentication/jwt.strategy';
import { AuthenticationMiddleware } from 'src/authentication/middlewares/authentication.middleware';
import { UserService } from './services/user/user.service';
import { UserController } from './controllers/user/user.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      
      
      // {
      //   name: PageNotification.name,
      //   schema: PageNotificationSchema,
      // },
    ]),
    JwtModule.register({
      secret: '8d396b83-eb9b-48f2-b71f-92337fc0013a',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [],
})

export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(UserController);
  }
}
