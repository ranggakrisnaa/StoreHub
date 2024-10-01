import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { OtpService } from '../otp/otp.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Module({
    controllers: [StoreController],
    providers: [
        StoreService,
        PrismaService,
        JwtService,
        OtpService,
        BcryptService,
        JwtStrategy,
        TokenService,
        UserService,
    ],
})
export class StoreModule {}
