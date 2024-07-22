import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { TokenService } from 'src/tokens/token.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
        private readonly userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) return false;
        const token = authHeader.split(' ')[1];

        try {
            const decoded: JwtPayload = this.jwtService.verify(token);
            if (!decoded) throw new ForbiddenException('Token is invalid.');

            const foundToken = await this.tokenService.findToken({ accessToken: token });
            if (!foundToken) throw new ForbiddenException('Unauthenticated User.');

            const foundUser = await this.userService.findUser({ email: decoded.email });
            if (!foundUser) throw new ForbiddenException('Unauthenticated User.');

            request.user = foundUser;
            request.token = foundToken;

            return true;
        } catch (err) {
            return false;
        }
    }
}
