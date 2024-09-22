import { Module } from '@nestjs/common';
import { LogService } from './services/log/log.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ErrorLog, ErrorLogSchema } from 'src/schemas/ErrorLog.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ErrorLog.name,
        schema: ErrorLogSchema,
      },
    ]),
  ],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule { }
