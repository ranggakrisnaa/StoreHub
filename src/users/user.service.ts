import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Otp, Prisma, Token, User } from '@prisma/client';
import { JwtPayload } from 'src/auth/interface/jwt.inteface';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { CreateUserDto } from './dto/register-user.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { LoginUserDto } from './dto/login-user.dto';
import { OtpService } from 'src/otps/otp.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtService: JwtStrategy,
        private readonly bcryptService: BcryptService,
        private readonly otpService: OtpService,
    ) {}

    async register(dataInput: CreateUserDto): Promise<User> {
        const { email, name, username, role, password, confirmPassword } = dataInput;
        if (password !== confirmPassword) throw new UnauthorizedException('Password is not match');
        const hashPassword: string = await this.bcryptService.hashPassword(confirmPassword);

        return await this.createUser({
            email,
            username,
            name,
            password: hashPassword,
            role,
        });
    }

    async login(dataInput: LoginUserDto): Promise<Record<string, any>> {
        const { usernameOrEmail, password } = dataInput;
        const data: Prisma.UserGetPayload<{}> = await this.findUser({
            OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        });
        if (!data) throw new NotFoundException('User name or email is not found.');
        const checkPassword: boolean = await this.bcryptService.comparePassword(password, data.password);
        if (!checkPassword) throw new BadRequestException('Password is invalid.');

        if (await this.otpService.checkDayLimit(data.email, 'login'))
            throw new BadRequestException('Batas percobaan harian telah tercapai.');
        if (await this.otpService.checkThrottle(data.email, 'login'))
            throw new BadRequestException('Anda telah melebihi batas dalam permintaan otp. Coba lagi dalam 1 menit.');

        const otp: string = await this.otpService.sendEmailOtp(data.email);
        const payload: Prisma.OtpCreateWithoutUserInput = {
            otp: parseInt(otp),
            type: 'login',
        };
        await this.otpService.saveOtp(payload, data.id);

        return { data, otp };
    }

    async verifyOtp(dataInput: VerifyOtpDto): Promise<Record<string, string>> {
        const { email, otp } = dataInput;
        const data: Prisma.UserGetPayload<{}> = await this.findUser({
            email,
        });
        if (!data) throw new NotFoundException('User email is not found.');

        const verify: boolean = await this.otpService.verifyOtp(data.id, 'login', otp);
        if (!verify) throw new BadRequestException('Otp expired or invalid.');

        const accessToken: string = await this.generateAccessToken(data);
        const refreshToken: string = await this.generateRefreshToken(data);

        const payload: Prisma.TokenCreateWithoutUserInput = {
            accessToken,
            refreshToken,
        };
        await this.saveToken(payload, data.id);

        return { accessToken, refreshToken };
    }

    async findUser(where: Prisma.UserWhereInput): Promise<User | null> {
        return this.prisma.user.findFirst({
            where,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data: data });
    }

    async findOneByEmailOrUsername(usernameOrEmail: string): Promise<User | null> {
        return await this.prisma.user.findFirst();
    }

    async generateAccessToken(data: User): Promise<string> {
        const payload: JwtPayload = { userId: data.id, email: data.email };
        return this.jwtService.signAccessToken(payload);
    }

    async generateRefreshToken(data: User): Promise<string> {
        const payload: JwtPayload = { userId: data.id, email: data.email };
        return this.jwtService.signRefreshToken(payload);
    }

    async saveToken(data: Prisma.TokenCreateWithoutUserInput, userId: number): Promise<Token> {
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
}
