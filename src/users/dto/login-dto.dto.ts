import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}