import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { OtpService } from 'src/otps/otp.service';
import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    providers: [UserService, PrismaService, BcryptService, OtpService, JwtStrategy],
})
export class UsersModule {}
