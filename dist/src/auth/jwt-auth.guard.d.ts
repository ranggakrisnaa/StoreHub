import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../tokens/token.service';
import { UserService } from '../users/user.service';
export declare class JwtAuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly tokenService;
    private readonly userService;
    private readonly configService;
    constructor(
        jwtService: JwtService,
        tokenService: TokenService,
        userService: UserService,
        configService: ConfigService,
    );
    canActivate(context: ExecutionContext): Promise<boolean>;
}
