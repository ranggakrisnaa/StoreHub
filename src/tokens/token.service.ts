import { Injectable } from '@nestjs/common';
import { Prisma, Token } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TokenService {
    constructor(private readonly prisma: PrismaService) {}

    async findToken(where: Prisma.TokenWhereInput): Promise<Token | null> {
        return this.prisma.token.findFirst({
            where,
        });
    }
}
