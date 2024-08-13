'use strict';
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
            d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OtpService = void 0;
const common_1 = require('@nestjs/common');
const otp_generator_1 = require('otp-generator');
const config_1 = require('@nestjs/config');
const twilio_1 = require('twilio');
const nodemailer_1 = require('nodemailer');
const prisma_service_1 = require('../prisma.service');
let OtpService = class OtpService {
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
        this.otpThrottleLimit = parseInt(process.env.OTP_THROTTLE_LIMIT);
        this.otpTryDailyLimit = parseInt(process.env.OTP_TRY_DAYLY_LIMIT);
        this.otpExpiredTime = parseInt(process.env.OTP_EXPIRED_AT);
        const smsConfig = this.configService.get('otp.sms.twilio');
        const emailConfig = this.configService.get('otp.email');
        this.twilioClient = new twilio_1.Twilio(smsConfig.accountSid, smsConfig.authToken);
        this.transporter = (0, nodemailer_1.createTransport)({
            host: emailConfig.host,
            port: emailConfig.port,
            secure: emailConfig.port === 465,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass,
            },
        });
    }
    async sendEmailOtp(email) {
        const otp = (0, otp_generator_1.generate)(6, {
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
        return otp;
    }
    async sendSmsOtp(phoneNumber) {
        const otp = (0, otp_generator_1.generate)(6, { digits: true, upperCaseAlphabets: false, specialChars: false });
        await this.twilioClient.messages.create({
            body: `Your OTP code is ${otp}`,
            from: this.configService.get('otp.sms.twilio.from'),
            to: phoneNumber,
        });
        return otp;
    }
    async verifyOtp(userId, type, otp) {
        const foundOtp = await this.prisma.otp.findFirst({
            where: {
                AND: [{ userId }, { type }, { otp }],
            },
        });
        if (!foundOtp) return false;
        if ((new Date().getTime() - new Date(foundOtp.createdAt).getTime()) / 60000 > this.otpExpiredTime) {
            return false;
        }
        return true;
    }
    async saveOtp(data, userId) {
        return this.prisma.otp.create({
            data: {
                ...data,
                User: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
    async findOtp(where) {
        return this.prisma.otp.findFirst({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async checkThrottle(email, type) {
        const foundOtp = await this.prisma.otp.findFirst({
            where: {
                User: {
                    email,
                },
                type,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!foundOtp) return false;
        if ((new Date().getTime() - new Date(foundOtp.createdAt).getTime()) / 60000 < this.otpThrottleLimit)
            return true;
        return false;
    }
    async checkDayLimit(email, type) {
        const foundOtp = await this.prisma.otp.findMany({
            where: {
                User: {
                    email,
                },
                type,
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                },
            },
        });
        if (foundOtp.length >= this.otpTryDailyLimit) return true;
        return false;
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate(
    [
        (0, common_1.Injectable)(),
        __metadata('design:paramtypes', [config_1.ConfigService, prisma_service_1.PrismaService]),
    ],
    OtpService,
);
//# sourceMappingURL=otp.service.js.map
