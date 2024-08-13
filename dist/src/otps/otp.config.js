'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const config_1 = require('@nestjs/config');
exports.default = (0, config_1.registerAs)('otp', () => ({
    sms: {
        twilio: {
            accountSid: process.env.TWILIO_ACCOUNT_SID,
            authToken: process.env.TWILIO_AUTH_TOKEN,
            from: process.env.TWILIO_PHONE_NUMBER,
        },
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT, 10),
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        from: process.env.EMAIL_FROM,
    },
}));
//# sourceMappingURL=otp.config.js.map
