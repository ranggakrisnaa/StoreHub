import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma, Token, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class TokenService {
    constructor(private readonly prisma: PrismaService) {}

    async findToken(where: Prisma.TokenWhereInput): Promise<Token | null> {
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
}
