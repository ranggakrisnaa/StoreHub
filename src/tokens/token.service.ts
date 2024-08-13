import { Injectable } from '@nestjs/common';
import { Prisma, Token, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TokenService {
    constructor(private readonly prisma: PrismaService) {}

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

    async deleteToken(where: Prisma.TokenWhereUniqueInput): Promise<Token> {
        return this.prisma.token.delete({ where });
    }
}
