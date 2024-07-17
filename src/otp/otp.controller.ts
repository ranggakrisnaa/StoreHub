import { Controller, Post, Body, Param, InternalServerErrorException } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('v1/otps')
export class OtpController {
    constructor(private readonly otpService: OtpService) {}

    @Post('send-sms')
    async sendSmsOtp(@Body('phoneNumber') phoneNumber: string) {
        try {
            await this.otpService.sendSmsOtp(phoneNumber);
            return { message: 'OTP sent to phone number' };
        } catch (error) {
            if (error !== InternalServerErrorException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    @Post('send-email')
    async sendEmailOtp(@Body('email') email: string) {
        try {
            await this.otpService.sendEmailOtp(email);
            return { message: 'OTP sent to email address' };
        } catch (error) {
            if (error !== InternalServerErrorException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
}
