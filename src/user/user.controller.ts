import {
    Controller,
    Post,
    Body,
    InternalServerErrorException,
    Res,
    HttpStatus,
    Request,
    UseGuards,
    Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from './user.service';
import { ApiResponse } from '../response/api-response.dto';
import { ChangePasswordUserDto } from './dto/change-password-user.dto';
import { FindUserByEmailDto } from './dto/find-user-by-email.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('v1/users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Record<string, any>> {
        const data = await this.usersService.register(createUserDto);

        return ApiResponse.sendResponse(res, HttpStatus.CREATED, 'User created successfully.', data);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Record<string, any>> {
        const { data, otp } = await this.usersService.login(loginUserDto);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'User login successfully.', { otp, email: data.email });
    }

    @Post('verify-otp')
    async verify(@Body() verifyOtpDto: VerifyOtpDto, @Res() res: Response): Promise<Record<string, any>> {
        const { accessToken, refreshToken } = await this.usersService.verifyOtp(verifyOtpDto);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'User verified successfully.', {
            accessToken,
            refreshToken,
        });
    }

    @Post('find-user')
    async findUserByEmail(@Body() findUserByEmailDto: FindUserByEmailDto, @Res() res: Response) {
        const data = await this.usersService.findUserByEmail(findUserByEmailDto);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'User verified successfully.', {
            userId: data,
        });
    }

    @Post('change-password/:userId')
    async changePassword(
        @Body() changePasswordDto: ChangePasswordUserDto,
        @Res() res: Response,
        @Param('userId') userId: string,
    ): Promise<Record<string, any>> {
        const data = await this.usersService.changePassword(changePasswordDto, userId);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'User changed password successfully.', data);
    }

    @Post('refresh')
    async refresh(@Body() data: Record<any, any>, @Res() res: Response): Promise<Record<string, any>> {
        const accessToken = await this.usersService.refresh(data.refreshToken);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Token Refreshed successfully.', { accessToken });
    }

    @UseGuards(JwtAuthGuard)
    @Post('/logout')
    async logout(
        @Body() data: Record<any, any>,
        @Res() res: Response,
        @Request() req: Record<any, any>,
    ): Promise<Record<string, any>> {
        await this.usersService.logout(req.body);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'User logout successfully.');
    }
}
