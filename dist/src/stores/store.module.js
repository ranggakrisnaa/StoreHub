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
Object.defineProperty(exports, '__esModule', { value: true });
exports.StoreModule = void 0;
const common_1 = require('@nestjs/common');
const store_service_1 = require('./store.service');
const store_controller_1 = require('./store.controller');
const jwt_1 = require('@nestjs/jwt');
const prisma_service_1 = require('../prisma.service');
const otp_service_1 = require('../otps/otp.service');
const bcrypt_service_1 = require('../bcrypt/bcrypt.service');
const jwt_strategy_1 = require('../auth/jwt.strategy');
const token_service_1 = require('../tokens/token.service');
const user_service_1 = require('../users/user.service');
let StoreModule = class StoreModule {};
exports.StoreModule = StoreModule;
exports.StoreModule = StoreModule = __decorate(
    [
        (0, common_1.Module)({
            controllers: [store_controller_1.StoreController],
            providers: [
                store_service_1.StoreService,
                prisma_service_1.PrismaService,
                jwt_1.JwtService,
                otp_service_1.OtpService,
                bcrypt_service_1.BcryptService,
                jwt_strategy_1.JwtStrategy,
                token_service_1.TokenService,
                user_service_1.UserService,
            ],
        }),
    ],
    StoreModule,
);
//# sourceMappingURL=store.module.js.map
