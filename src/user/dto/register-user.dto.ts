import { IsNotEmpty, IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email address' })
    @IsString()
    email: string;

    @IsString()
    role: 'USER' | 'ADMIN';

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}
