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
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AppModule = void 0;
const common_1 = require('@nestjs/common');
const app_controller_1 = require('./app.controller');
const app_service_1 = require('./app.service');
const user_module_1 = require('./users/user.module');
const bcrypt_module_1 = require('./bcrypt/bcrypt.module');
const passport_1 = require('@nestjs/passport');
const otp_module_1 = require('./otps/otp.module');
const config_1 = require('@nestjs/config');
const token_module_1 = require('./tokens/token.module');
const store_module_1 = require('./stores/store.module');
const product_module_1 = require('./products/product.module');
const otp_config_1 = __importDefault(require('./otps/otp.config'));
let AppModule = class AppModule {};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate(
    [
        (0, common_1.Module)({
            imports: [
                user_module_1.UsersModule,
                otp_module_1.OtpModule,
                bcrypt_module_1.BcryptModule,
                passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
                config_1.ConfigModule.forRoot({
                    load: [otp_config_1.default],
                    isGlobal: true,
                }),
                token_module_1.TokenModule,
                store_module_1.StoreModule,
                product_module_1.ProductModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService],
        }),
    ],
    AppModule,
);
//# sourceMappingURL=app.module.js.map
