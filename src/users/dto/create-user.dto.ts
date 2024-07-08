import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: 'USER' | 'ADMIN';

    @IsNotEmpty()
    confirmPassword: string;
}

