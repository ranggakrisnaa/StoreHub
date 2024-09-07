import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { Prisma, Token, User } from '@prisma/client';
import { CreateUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { OtpService } from '../otp/otp.service';
import { TokenService } from '../token/token.service';
import { JwtPayload } from '../auth/interface/jwt.inteface';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtStrategy: JwtStrategy,
        private readonly bcryptService: BcryptService,
        private readonly otpService: OtpService,
        private readonly tokenService: TokenService,
    ) {}

    async register(dataInput: CreateUserDto): Promise<User> {
        const { email, name, username, role = 'ADMIN', password, confirmPassword } = dataInput;

        const checkUserEmailOrUsername = await this.findOneByEmailOrUsername(email || username);

        if (checkUserEmailOrUsername) throw new BadRequestException('User already exist.');
        if (password !== confirmPassword) throw new UnauthorizedException('Password is not match.');

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
        return await this.prisma.user.findFirst({
            where: {
                OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
            },
        });
    }

    async generateAccessToken(data: User): Promise<string> {
        const payload: JwtPayload = { userId: data.id, email: data.email };
        return this.jwtStrategy.signAccessToken(payload);
    }

    async generateRefreshToken(data: User): Promise<string> {
        const payload: JwtPayload = { userId: data.id, email: data.email };
        return this.jwtStrategy.signRefreshToken(payload);
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

    async refresh(refreshToken: string): Promise<string> {
        const decoded = await this.tokenService.verify(refreshToken);

        const foundUser = await this.findUser({ id: decoded.userId });
        if (!foundUser) throw new ForbiddenException('Unauthenticated User.');

        const foundToken = await this.tokenService.findToken({ refreshToken, userId: foundUser.id });
        if (!foundToken) throw new ForbiddenException('Unauthenticated User.');

        const accessToken = await this.generateAccessToken(foundUser);
        await this.tokenService.updateToken(foundToken.id, accessToken);

        return accessToken;
    }

    async logout(data: Record<any, any>): Promise<Prisma.BatchPayload> {
        const { user, token } = data;

        const foundTokenDB = await this.tokenService.findToken({ userId: user.id, accessToken: token.accessToken });
        if (!foundTokenDB) throw new NotFoundException('Token user is not found.');

        return await this.tokenService.deleteToken({ userId: foundTokenDB.userId });
    }

    async changePassword(data: ChangePasswordUserDto, userId: string): Promise<User> {
        const { oldPassword, newPassword } = data;

        const foundUser = await this.prisma.user.findFirst({ where: { uuid: userId } });
        if (!foundUser) throw new NotFoundException('User is not found.');

        const checkPassword = await this.bcryptService.comparePassword(oldPassword, foundUser.password);
        if (!checkPassword) throw new BadRequestException('Password is not match.');

        const hashPassword = await this.bcryptService.hashPassword(newPassword);
        return await this.prisma.user.update({ where: { id: foundUser.id }, data: { password: hashPassword } });
    }

    async findUserByEmail(data: FindUserByEmailDto): Promise<string> {
        const foundUser = await this.findUser({ email: data.email });
        if (!foundUser) throw new NotFoundException('User is not found.');

        return foundUser.uuid;
    }
}
