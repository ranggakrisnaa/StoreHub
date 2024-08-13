import { ConfigService } from '@nestjs/config';
import { Otp, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class OtpService {
    private readonly configService;
    private prisma;
    private readonly twilioClient;
    private readonly transporter;
    private otpThrottleLimit;
    private otpTryDailyLimit;
    private otpExpiredTime;
    constructor(configService: ConfigService, prisma: PrismaService);
    sendEmailOtp(email: string): Promise<string>;
    sendSmsOtp(phoneNumber: string): Promise<string>;
    verifyOtp(userId: number, type: string, otp: number): Promise<boolean>;
    saveOtp(data: Prisma.OtpCreateWithoutUserInput, userId: number): Promise<Otp>;
    findOtp(where: Prisma.OtpWhereInput): Promise<Otp | null>;
    checkThrottle(email: string, type: string): Promise<boolean>;
    checkDayLimit(email: string, type: string): Promise<boolean>;
}
