import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { softDeletePlugin } from '../database/mongoose-plugins';

@Schema()
export class User {
  @Prop()
  user_name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: '1' })
  active: string;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop({ default: null })
  deleted_at: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(softDeletePlugin); // Apply the soft delete plugin