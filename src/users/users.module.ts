import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [UsersController,],
  providers: [UsersService, PrismaClient, BcryptModule],
})
export class UsersModule { }
