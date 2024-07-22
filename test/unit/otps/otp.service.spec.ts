import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import * as Twilio from 'twilio';
import { OtpService } from 'src/otps/otp.service';

describe('OtpService', () => {
    let service: OtpService;
    let mockTransporter: Partial<nodemailer.Transporter>;
    let mockTwilioClient: Partial<Twilio.Twilio>;
    let configService: Partial<ConfigService>;

    beforeEach(async () => {
        mockTransporter = {
            sendMail: jest.fn().mockResolvedValue({}),
        };

        mockTwilioClient = {
            messages: {
                create: jest.fn().mockResolvedValue({}),
            } as any,
        };

        configService = {
            get: jest.fn().mockImplementation((key: string) => {
                switch (key) {
                    case 'otp.sms.twilio.accountSid':
                        return 'mockAccountSid';
                    case 'otp.sms.twilio.authToken':
                        return 'mockAuthToken';
                    case 'otp.sms.twilio.from':
                        return '+1234567890';
                    case 'otp.email.host':
                        return 'smtp.example.com';
                    case 'otp.email.port':
                        return 587;
                    case 'otp.email.user':
                        return 'your-email@example.com';
                    case 'otp.email.pass':
                        return 'your-email-password';
                    case 'otp.email.from':
                        return 'your-email@example.com';
                }
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OtpService,
                {
                    provide: ConfigService,
                    useValue: configService,
                },
                {
                    provide: nodemailer.createTransport,
                    useValue: mockTransporter,
                },
                {
                    provide: Twilio,
                    useValue: mockTwilioClient,
                },
            ],
        }).compile();

        service = module.get<OtpService>(OtpService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sendEmailOtp', () => {
        it('should send an email with OTP', async () => {
            const email = 'test@example.com';
            await service.sendEmailOtp(email);
            expect(mockTransporter.sendMail).toHaveBeenCalledWith({
                from: 'your-email@example.com',
                to: email,
                subject: 'Your OTP Code',
                text: expect.stringMatching(/\d{6}/),
            });
        });
    });

    describe('sendSmsOtp', () => {
        it('should send an SMS with OTP', async () => {
            const phoneNumber = '+1234567890';
            await service.sendSmsOtp(phoneNumber);
            expect(mockTwilioClient.messages.create).toHaveBeenCalledWith({
                body: expect.stringMatching(/\d{6}/),
                from: '+1234567890',
                to: phoneNumber,
            });
        });
    });
});
