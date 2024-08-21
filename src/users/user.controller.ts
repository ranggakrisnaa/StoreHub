import {
    Controller,
    Post,
    Body,
    InternalServerErrorException,
    Res,
    HttpStatus,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from './user.service';
import { ApiResponse } from '../api-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('v1/users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Record<string, any>> {
        try {
            const data = await this.usersService.register(createUserDto);

            return new ApiResponse(HttpStatus.CREATED, 'User created successfully.', data).sendResponse(res);
        } catch (error) {
            throw error;
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
            throw error;
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
            throw error;
        }
    }

    @Post('refresh')
    async refresh(@Body() data: Record<any, any>, @Res() res: Response): Promise<Record<string, any>> {
        try {
            const accessToken = await this.usersService.refresh(data.refreshToken);

            return new ApiResponse(HttpStatus.OK, 'Token Refreshed successfully.', { accessToken }).sendResponse(res);
        } catch (error) {
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(
        @Body() data: Record<any, any>,
        @Res() res: Response,
        @Request() req: Record<any, any>,
    ): Promise<Record<string, any>> {
        try {
            await this.usersService.logout(req.body);

            return new ApiResponse(HttpStatus.OK, 'User logout successfully.').sendResponse(res);
        } catch (error) {
            throw error;
        }
    }
}
