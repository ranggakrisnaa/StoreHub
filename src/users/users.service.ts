import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findUser(
    where: Prisma.UserWhereInput,
  ): Promise<User | null> {
    return this.prisma.user.findFirst({
      where
    });
  }


  async createUser(data: Prisma.UserCreateWithoutTokenInput): Promise<User | null> {
    return this.prisma.user.create({ data: data })
  }

  async findOneByEmailOrUsername(usernameOrEmail: string): Promise<User | null> {
    return await this.prisma.user.findFirst()
  }

}
