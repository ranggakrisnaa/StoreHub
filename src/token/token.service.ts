import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, Token, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async findToken(where: Prisma.TokenWhereInput): Promise<Token | null> {
        return this.prisma.token.findFirst({
            where,
        });
    }

    async findTokenAND(where: Prisma.TokenWhereInput): Promise<Token | null> {
        return this.prisma.token.findFirst({
            where,
        });
    }

    async updateToken(tokenId: number, accessToken: string): Promise<Token> {
        return this.prisma.token.update({
            where: {
                id: tokenId,
            },
            data: {
                accessToken,
            },
        });
    }

    async deleteToken(where: Prisma.TokenWhereInput): Promise<Prisma.BatchPayload> {
        return this.prisma.token.deleteMany({ where });
    }

    async verify(refreshToken: string) {
        try {
            const decoded = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('JWT_SECRET'),
            });

            return decoded;
        } catch (error) {
            if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError)
                throw new UnauthorizedException('Refresh token has expired');

            throw new ForbiddenException('Failed to authenticate token');
        }
    }
}
