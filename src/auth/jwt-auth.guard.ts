import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { verify } from 'crypto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const authHeader = request.headers.authorization;
        if (!authHeader) throw new HttpException('User token is not found.', HttpStatus.NOT_FOUND);

        const token = authHeader.split(' ')[1];
        const decoded: JwtPayload = await this.tokenService.verify(token);

        const foundToken: Prisma.TokenGetPayload<{}> = await this.tokenService.findToken({ accessToken: token });
        if (!foundToken) throw new HttpException('Unauthenticated User.', HttpStatus.FORBIDDEN);

        const foundUser: Prisma.UserGetPayload<{}> = await this.userService.findUser({ email: decoded.email });
        if (!foundUser) throw new HttpException('Unauthenticated User.', HttpStatus.FORBIDDEN);

        request.body.user = foundUser;
        request.body.token = foundToken;

        return true;
    }
}
