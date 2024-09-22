import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, minLength } from 'class-validator';


export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Bruce Wayne', description: 'UserName' })
  user_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ 
    example: 'Password123!@#', 
    description: 'Password should contain at least 8 characters, including at least 1 letter, 1 number, and 1 special character.'
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}|\\:;'"<>,.?/~`])[A-Za-z\d!@#$%^&*()_\-+=\[\]{}|\\:;'"<>,.?/~`]{8,}$/, {
    message: 'Password must be at least 8 characters long and contain at least 1 letter, 1 number, and 1 special character.'
  })  password: string;
}
