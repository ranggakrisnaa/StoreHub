import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email address' })
    @IsString()
    email: string;

    @IsNumber()
    otp: number;
}
