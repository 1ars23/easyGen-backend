import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { softDeletePlugin } from '../database/mongoose-plugins';

@Schema({ collection: 'error_logs' })
export class ErrorLog {
    @Prop()
    uid: string;

    @Prop()
    message: string;

    @Prop()
    code: string;

    @Prop()
    datetime: string;

    @Prop()
    stack: string;

    @Prop()
    context: string;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: Date.now })
    updated_at: Date;

    @Prop({ default: null })
    deleted_at: Date;
}
export const ErrorLogSchema = SchemaFactory.createForClass(ErrorLog);
ErrorLogSchema.plugin(softDeletePlugin); // Apply the soft delete plugin