import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interface/jwt.inteface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload): Promise<{ userId: number; email: string }> {
        return { userId: payload.userId, email: payload.email };
    }

    async signAccessToken(payload: JwtPayload): Promise<string> {
        return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
            expiresIn: '15m',
        });
    }

    async signRefreshToken(payload: JwtPayload): Promise<string> {
        return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
            expiresIn: '7d',
        });
    }
}
