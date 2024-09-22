import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import * as passport from 'passport';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt', { session: false }, async (err, data) => {
      const user = data.id ? await this.userModel.findById(data.id) : null;
      if (err || !user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.user = user;
      next();
    })(req, res, next);
  }
}
