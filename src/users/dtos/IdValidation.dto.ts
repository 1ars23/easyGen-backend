import { IsString, Matches } from 'class-validator';

export class UserIdDto {
  @Matches(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ID' })
  id: string;
}
