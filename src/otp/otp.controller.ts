import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Response } from 'express';

@Controller('v1/otps')
export class OtpController {
    constructor(private readonly otpService: OtpService) {}

    @Post('send-sms')
    async sendSmsOtp(@Body('phoneNumber') phoneNumber: string, @Res() res: Response): Promise<Record<string, any>> {
        try {
            await this.otpService.sendSmsOtp(phoneNumber);
            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: 'OTP sent to phone number.',
            });
        } catch (error) {
            throw error;
        }
    }

    @Post('send-email')
    async sendEmailOtp(@Body('email') email: string, @Res() res: Response): Promise<Record<string, any>> {
        try {
            await this.otpService.sendEmailOtp(email);
            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: 'OTP sent to email address.',
            });
        } catch (error) {
            throw error;
        }
    }
}
