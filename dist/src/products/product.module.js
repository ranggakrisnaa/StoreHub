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
exports.ProductModule = void 0;
const common_1 = require('@nestjs/common');
const product_service_1 = require('./product.service');
const product_controller_1 = require('./product.controller');
const token_service_1 = require('../tokens/token.service');
const prisma_service_1 = require('../prisma.service');
const jwt_auth_guard_1 = require('../auth/jwt-auth.guard');
const user_service_1 = require('../users/user.service');
const jwt_strategy_1 = require('../auth/jwt.strategy');
const bcrypt_service_1 = require('../bcrypt/bcrypt.service');
const otp_service_1 = require('../otps/otp.service');
let ProductModule = class ProductModule {};
exports.ProductModule = ProductModule;
exports.ProductModule = ProductModule = __decorate(
    [
        (0, common_1.Module)({
            controllers: [product_controller_1.ProductController],
            providers: [
                product_service_1.ProductService,
                token_service_1.TokenService,
                prisma_service_1.PrismaService,
                jwt_auth_guard_1.JwtAuthGuard,
                user_service_1.UserService,
                jwt_strategy_1.JwtStrategy,
                bcrypt_service_1.BcryptService,
                otp_service_1.OtpService,
            ],
        }),
    ],
    ProductModule,
);
//# sourceMappingURL=product.module.js.map
