import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Token, User } from '@prisma/client';
import { JwtPayload } from 'src/auth/interface/jwt.inteface';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtService: JwtStrategy,
    ) {}

    async findUser(where: Prisma.UserWhereInput): Promise<User | null> {
        return this.prisma.user.findFirst({
            where,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data: data });
    }

    async findOneByEmailOrUsername(usernameOrEmail: string): Promise<User | null> {
        return await this.prisma.user.findFirst();
    }

    async generateAccessToken(data: User): Promise<string> {
        const payload: JwtPayload = { userId: data.id, email: data.email };
        return this.jwtService.signAccessToken(payload);
    }

    async generateRefreshToken(data: User): Promise<string> {
        const payload: JwtPayload = { userId: data.id, email: data.email };
        return this.jwtService.signRefreshToken(payload);
    }

    async saveToken(data: Prisma.TokenCreateWithoutUserInput, userId: number): Promise<Token> {
        return this.prisma.token.create({
            data: {
                ...data,
                User: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }
}
