import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User email address',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Password123!@#', description: 'User password' })
  password: string;
}
