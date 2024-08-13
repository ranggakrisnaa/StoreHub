import { OtpService } from './otp.service';
import { Response } from 'express';
export declare class OtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    sendSmsOtp(phoneNumber: string, res: Response): Promise<Record<string, any>>;
    sendEmailOtp(email: string, res: Response): Promise<Record<string, any>>;
}
