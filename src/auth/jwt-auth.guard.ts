import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { TokenService } from '../tokens/token.service';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const authHeader = request.headers.authorization;

            if (!authHeader) return false;
            const token = authHeader.split(' ')[1];
            const decoded: JwtPayload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });

            const foundToken: Prisma.TokenGetPayload<{}> = await this.tokenService.findToken({ accessToken: token });
            if (!foundToken) throw new ForbiddenException('Unauthenticated User.');

            const foundUser: Prisma.UserGetPayload<{}> = await this.userService.findUser({ email: decoded.email });
            if (!foundUser) throw new ForbiddenException('Unauthenticated User.');

            request.body.user = foundUser;
            request.body.token = foundToken;

            return true;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
