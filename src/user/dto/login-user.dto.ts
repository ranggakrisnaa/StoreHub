import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail({}, { message: 'Invalid email address' })
    usernameOrEmail: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
