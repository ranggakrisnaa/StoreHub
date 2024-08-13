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
var __param =
    (this && this.__param) ||
    function (paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex);
        };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.OtpController = void 0;
const common_1 = require('@nestjs/common');
const otp_service_1 = require('./otp.service');
let OtpController = class OtpController {
    constructor(otpService) {
        this.otpService = otpService;
    }
    async sendSmsOtp(phoneNumber, res) {
        try {
            await this.otpService.sendSmsOtp(phoneNumber);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'OTP sent to phone number.',
            });
        } catch (error) {
            if (error !== common_1.InternalServerErrorException) {
                throw error;
            } else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async sendEmailOtp(email, res) {
        try {
            await this.otpService.sendEmailOtp(email);
            return res.status(common_1.HttpStatus.OK).json({
                success: true,
                statusCode: common_1.HttpStatus.OK,
                message: 'OTP sent to email address.',
            });
        } catch (error) {
            if (error !== common_1.InternalServerErrorException) {
                throw error;
            } else {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
};
exports.OtpController = OtpController;
__decorate(
    [
        (0, common_1.Post)('send-sms'),
        __param(0, (0, common_1.Body)('phoneNumber')),
        __param(1, (0, common_1.Res)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String, Object]),
        __metadata('design:returntype', Promise),
    ],
    OtpController.prototype,
    'sendSmsOtp',
    null,
);
__decorate(
    [
        (0, common_1.Post)('send-email'),
        __param(0, (0, common_1.Body)('email')),
        __param(1, (0, common_1.Res)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [String, Object]),
        __metadata('design:returntype', Promise),
    ],
    OtpController.prototype,
    'sendEmailOtp',
    null,
);
exports.OtpController = OtpController = __decorate(
    [(0, common_1.Controller)('v1/otps'), __metadata('design:paramtypes', [otp_service_1.OtpService])],
    OtpController,
);
//# sourceMappingURL=otp.controller.js.map
