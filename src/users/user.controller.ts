import {
    Controller,
    Post,
    Body,
    InternalServerErrorException,
    Res,
    HttpStatus,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Prisma } from '@prisma/client';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpService } from 'src/otps/otp.service';
import { UserService } from './user.service';

@Controller('v1/users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Record<string, any>> {
        try {
            const data = await this.usersService.register(createUserDto);

            return res.status(HttpStatus.CREATED).json({
                success: true,
                statusCode: HttpStatus.CREATED,
                message: 'User created successfully.',
                data,
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Record<string, any>> {
        try {
            const { data, otp } = await this.usersService.login(loginUserDto);

            return res.status(HttpStatus.OK).json({
                success: true,
                statusCode: HttpStatus.OK,
                message: 'User login successfully.',
                otp,
                email: data.email,
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('verify-otp')
    async verify(@Body() verifyOtpDto: VerifyOtpDto, @Res() res: Response): Promise<Record<string, any>> {
        try {
            const { accessToken, refreshToken } = await this.usersService.verifyOtp(verifyOtpDto);

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
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('refresh')
    async refresh() {
        try {
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
