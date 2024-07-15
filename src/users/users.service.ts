import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }


  create(data: Prisma.UserCreateWithoutTokenInput): Promise<User> {
    return this.prisma.user.create({ data: data })
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneByEmailOrUsername(usernameOrEmail: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: { equals: usernameOrEmail }
          },
          {
            username: { equals: usernameOrEmail }
          }
        ]
      }
    })
  }

}
