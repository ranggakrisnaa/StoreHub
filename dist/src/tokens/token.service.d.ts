import { Prisma, Token } from '@prisma/client';
import { PrismaService } from '../prisma.service';
export declare class TokenService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findToken(where: Prisma.TokenWhereInput): Promise<Token | null>;
    findTokenAND(where: Prisma.TokenWhereInput): Promise<Token | null>;
    updateToken(tokenId: number, accessToken: string): Promise<Token>;
    deleteToken(where: Prisma.TokenWhereUniqueInput): Promise<Token>;
}
