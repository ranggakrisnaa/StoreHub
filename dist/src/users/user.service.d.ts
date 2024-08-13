import { Prisma, Token, User } from '@prisma/client';
import { CreateUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { OtpService } from '../otps/otp.service';
import { TokenService } from '../tokens/token.service';
export declare class UserService {
    private prisma;
    private readonly jwtStrategy;
    private readonly bcryptService;
    private readonly otpService;
    private readonly configService;
    private readonly jwtService;
    private readonly tokenService;
    constructor(
        prisma: PrismaService,
        jwtStrategy: JwtStrategy,
        bcryptService: BcryptService,
        otpService: OtpService,
        configService: ConfigService,
        jwtService: JwtService,
        tokenService: TokenService,
    );
    register(dataInput: CreateUserDto): Promise<User>;
    login(dataInput: LoginUserDto): Promise<Record<string, any>>;
    verifyOtp(dataInput: VerifyOtpDto): Promise<Record<string, string>>;
    findUser(where: Prisma.UserWhereInput): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    findOneByEmailOrUsername(usernameOrEmail: string): Promise<User | null>;
    generateAccessToken(data: User): Promise<string>;
    generateRefreshToken(data: User): Promise<string>;
    saveToken(data: Prisma.TokenCreateWithoutUserInput, userId: number): Promise<Token>;
    refresh(refreshToken: string): Promise<string>;
    logout(data: Record<any, any>): Promise<Token>;
}
