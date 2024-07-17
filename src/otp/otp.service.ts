import { Injectable } from '@nestjs/common';
import { generate } from 'otp-generator';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { createTransport } from 'nodemailer';
import otpConfig from './otp.config';

@Injectable()
export class OtpService {
    private readonly twilioClient: Twilio;
    private readonly transporter: any;

    constructor(private readonly configService: ConfigService) {
        const smsConfig = this.configService.get('otp.sms.twilio');
        const emailConfig = this.configService.get('otp.email');

        this.twilioClient = new Twilio(smsConfig.accountSid, smsConfig.authToken);

        this.transporter = createTransport({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: emailConfig.port === 465,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass,
            },
        });
    }

    async sendEmailOtp(email: string): Promise<void> {
        console.log(email);

        const otp: string = generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        await this.transporter.sendMail({
            from: this.configService.get('otp.email.from'),
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        });
        console.log(`Generated OTP for ${email}: ${otp}`);
        return;
    }

    async sendSmsOtp(phoneNumber: string): Promise<void> {
        const otp: string = generate(6, { digits: true, upperCaseAlphabets: false, specialChars: false });
        await this.twilioClient.messages.create({
            body: `Your OTP code is ${otp}`,
            from: this.configService.get('otp.sms.twilio.from'),
            to: phoneNumber,
        });
        console.log(`Generated OTP for ${phoneNumber}: ${otp}`);
        return;
    }

    async verifyOtp(code: string, phoneNumberOrEmail: string): Promise<boolean> {
        return true;
    }
}
