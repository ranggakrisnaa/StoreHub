import { Controller, Post, Body, InternalServerErrorException, Res, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from './user.service';
import { ApiResponse } from 'src/api-response.dto';

@Controller('v1/users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Record<string, any>> {
        try {
            const data = await this.usersService.register(createUserDto);

            return new ApiResponse(HttpStatus.CREATED, 'User created successfully.', data).sendResponse(res);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Record<string, any>> {
        try {
            const { data, otp } = await this.usersService.login(loginUserDto);

            return new ApiResponse(HttpStatus.OK, 'User login successfully.', { otp, email: data.email }).sendResponse(
                res,
            );
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Post('verify-otp')
    async verify(@Body() verifyOtpDto: VerifyOtpDto, @Res() res: Response): Promise<Record<string, any>> {
        try {
            const { accessToken, refreshToken } = await this.usersService.verifyOtp(verifyOtpDto);

            return new ApiResponse(HttpStatus.OK, 'User verified successfully.', {
                accessToken,
                refreshToken,
            }).sendResponse(res);
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
