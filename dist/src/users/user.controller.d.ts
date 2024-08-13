import { CreateUserDto } from './dto/register-user.dto';
import { Response } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    register(createUserDto: CreateUserDto, res: Response): Promise<Record<string, any>>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<Record<string, any>>;
    verify(verifyOtpDto: VerifyOtpDto, res: Response): Promise<Record<string, any>>;
    refresh(data: Record<any, any>, res: Response): Promise<Record<string, any>>;
    logout(data: Record<any, any>, res: Response, req: Record<any, any>): Promise<Record<string, any>>;
}
