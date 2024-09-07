import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class ChangePasswordUserDto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
