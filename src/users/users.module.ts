import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { OtpService } from 'src/otp/otp.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, BcryptService, OtpService],
})
export class UsersModule {}
