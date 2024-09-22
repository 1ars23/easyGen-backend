import { ConsoleLogger, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorLog } from 'src/schemas/ErrorLog.schema';
import * as crypto from 'crypto';

@Injectable()
export class LogService extends ConsoleLogger {
  constructor(@InjectModel(ErrorLog.name) private errorLog: Model<ErrorLog>) {
    super();
  }

  async error(message: any, stack?: string, context?: string) {
    const uid = crypto.randomUUID();
    const errorLog = await this.errorLog.create({
      uid: crypto.randomUUID(),
      message: message,
      code: 500,
      stack: stack,
      context: context,
      datetime: new Date(),
    });

    return {
      error_id: uid.toString(),
      message: `unexpected error happened, Please contact support with Error ID ${uid.toString()}`,
    };
  }
}
