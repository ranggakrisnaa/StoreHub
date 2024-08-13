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
exports.UserService = void 0;
const common_1 = require('@nestjs/common');
const config_1 = require('@nestjs/config');
const jwt_1 = require('@nestjs/jwt');
const prisma_service_1 = require('../prisma.service');
const jwt_strategy_1 = require('../auth/jwt.strategy');
const bcrypt_service_1 = require('../bcrypt/bcrypt.service');
const otp_service_1 = require('../otps/otp.service');
const token_service_1 = require('../tokens/token.service');
let UserService = class UserService {
    constructor(prisma, jwtStrategy, bcryptService, otpService, configService, jwtService, tokenService) {
        this.prisma = prisma;
        this.jwtStrategy = jwtStrategy;
        this.bcryptService = bcryptService;
        this.otpService = otpService;
        this.configService = configService;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
    }
    async register(dataInput) {
        const { email, name, username, role, password, confirmPassword } = dataInput;
        if (password !== confirmPassword) throw new common_1.UnauthorizedException('Password is not match');
        const hashPassword = await this.bcryptService.hashPassword(confirmPassword);
        return await this.createUser({
            email,
            username,
            name,
            password: hashPassword,
            role,
        });
    }
    async login(dataInput) {
        const { usernameOrEmail, password } = dataInput;
        const data = await this.findUser({
            OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        });
        if (!data) throw new common_1.NotFoundException('User name or email is not found.');
        const checkPassword = await this.bcryptService.comparePassword(password, data.password);
        if (!checkPassword) throw new common_1.BadRequestException('Password is invalid.');
        if (await this.otpService.checkDayLimit(data.email, 'login'))
            throw new common_1.BadRequestException('Batas percobaan harian telah tercapai.');
        if (await this.otpService.checkThrottle(data.email, 'login'))
            throw new common_1.BadRequestException(
                'Anda telah melebihi batas dalam permintaan otp. Coba lagi dalam 1 menit.',
            );
        const otp = await this.otpService.sendEmailOtp(data.email);
        const payload = {
            otp: parseInt(otp),
            type: 'login',
        };
        await this.otpService.saveOtp(payload, data.id);
        return { data, otp };
    }
    async verifyOtp(dataInput) {
        const { email, otp } = dataInput;
        const data = await this.findUser({
            email,
        });
        if (!data) throw new common_1.NotFoundException('User email is not found.');
        const verify = await this.otpService.verifyOtp(data.id, 'login', otp);
        if (!verify) throw new common_1.BadRequestException('Otp expired or invalid.');
        const accessToken = await this.generateAccessToken(data);
        const refreshToken = await this.generateRefreshToken(data);
        const payload = {
            accessToken,
            refreshToken,
        };
        await this.saveToken(payload, data.id);
        return { accessToken, refreshToken };
    }
    async findUser(where) {
        return this.prisma.user.findFirst({
            where,
        });
    }
    async createUser(data) {
        return this.prisma.user.create({ data: data });
    }
    async findOneByEmailOrUsername(usernameOrEmail) {
        return await this.prisma.user.findFirst({
            where: {
                OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            },
        });
    }
    async generateAccessToken(data) {
        const payload = { userId: data.id, email: data.email };
        return this.jwtStrategy.signAccessToken(payload);
    }
    async generateRefreshToken(data) {
        const payload = { userId: data.id, email: data.email };
        return this.jwtStrategy.signRefreshToken(payload);
    }
    async saveToken(data, userId) {
        return this.prisma.token.create({
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
    async refresh(refreshToken) {
        const decoded = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get('JWT_SECRET'),
        });
        if (!decoded) throw new common_1.ForbiddenException('Unauthenticated User.');
        const foundUser = await this.findUser({ id: decoded.userId });
        if (!foundUser) throw new common_1.ForbiddenException('Unauthenticated User.');
        const foundToken = await this.tokenService.findToken({ refreshToken, userId: foundUser.id });
        const accessToken = await this.generateAccessToken(foundUser);
        await this.tokenService.updateToken(foundToken.id, accessToken);
        return accessToken;
    }
    async logout(data) {
        const { user, token } = data;
        console.log({ token: token.accessToken });
        const foundTokenDB = await this.tokenService.findToken({ userId: user.id, accessToken: token.accessToken });
        console.log({ foundTokenDB });
        if (!foundTokenDB) throw new common_1.NotFoundException('Token user is not found.');
        return await this.tokenService.deleteToken({ id: foundTokenDB.id });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate(
    [
        (0, common_1.Injectable)(),
        __metadata('design:paramtypes', [
            prisma_service_1.PrismaService,
            jwt_strategy_1.JwtStrategy,
            bcrypt_service_1.BcryptService,
            otp_service_1.OtpService,
            config_1.ConfigService,
            jwt_1.JwtService,
            token_service_1.TokenService,
        ]),
    ],
    UserService,
);
//# sourceMappingURL=user.service.js.map
