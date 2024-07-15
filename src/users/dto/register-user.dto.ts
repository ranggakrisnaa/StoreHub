import { IsNotEmpty, IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    role: 'USER' | 'ADMIN';

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}

