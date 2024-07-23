import {
    Controller,
    Post,
    Body,
    InternalServerErrorException,
    UnauthorizedException,
    Res,
    HttpStatus,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/register-user.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Prisma } from '@prisma/client';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JwtPayload } from 'src/auth/interface/jwt.inteface';
import { OtpService } from 'src/otps/otp.service';
import { UserService } from './user.service';

@Controller('v1/users')
export class UserController {
    constructor(
        private readonly usersService: UserService,
        private readonly bcryptService: BcryptService,
        private readonly otpService: OtpService,
    ) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Record<string, any>> {
        const { email, name, username, role, password, confirmPassword } = createUserDto;
        try {
            if (password !== confirmPassword) throw new UnauthorizedException('Password is not match');
            const hashPassword: string = await this.bcryptService.hashPassword(confirmPassword);

            const data: Prisma.UserCreateInput = await this.usersService.createUser({
                email,
                username,
                name,
                password: hashPassword,
                role,
            });

            return res.status(HttpStatus.CREATED).json({
                success: true,
                statusCode: HttpStatus.CREATED,
                message: 'User created successfully.',
                data,
            });
        } catch (error) {
            if (error !== InternalServerErrorException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Record<string, any>> {
        const { usernameOrEmail, password } = loginUserDto;
        const data: Prisma.UserGetPayload<{}> = await this.usersService.findUser({
            OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        });
        if (!data) throw new NotFoundException('User name or email is not found.');

        try {
            const checkPassword: boolean = await this.bcryptService.comparePassword(password, data.password);
            if (!checkPassword) throw new BadRequestException('Password is invalid.');

            if (await this.otpService.checkDayLimit(data.email, 'login'))
                throw new BadRequestException('Batas percobaan harian telah tercapai.');
            if (await this.otpService.checkThrottle(data.email, 'login'))
                throw new BadRequestException(
                    'Anda telah melebihi batas dalam permintaan otp. Coba lagi dalam 1 menit.',
                );

            const otp: string = await this.otpService.sendEmailOtp(data.email);
            const payload: Prisma.OtpCreateWithoutUserInput = {
                otp: parseInt(otp),
                type: 'login',
            };
            await this.otpService.saveOtp(payload, data.id);

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: 'User login successfully.',
                otp,
                email: data.email,
            });
        } catch (error) {
            if (error !== InternalServerErrorException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    @Post('verify-otp')
    async verify(@Body() verifyOtpDto: VerifyOtpDto, @Res() res: Response): Promise<Record<string, any>> {
        const { email, otp } = verifyOtpDto;
        const data: Prisma.UserGetPayload<{}> = await this.usersService.findUser({
            email,
        });
        if (!data) throw new NotFoundException('User email is not found.');

        try {
            const foundOtp: Prisma.OtpGetPayload<{}> = await this.otpService.findOtp({ userId: data.id });
            if (foundOtp.otp !== otp) throw new UnauthorizedException('Otp code is invalid.');

            const accessToken: string = await this.usersService.generateAccessToken(data);
            const refreshToken: string = await this.usersService.generateRefreshToken(data);

            const payload: Prisma.TokenCreateWithoutUserInput = {
                accessToken,
                refreshToken,
            };
            await this.usersService.saveToken(payload, data.id);

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: 'User verified successfully.',
                meta: {
                    accessToken,
                    refreshToken,
                },
            });
        } catch (error) {
            if (error !== InternalServerErrorException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
}
