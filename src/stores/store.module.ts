import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/tokens/token.service';
import { UserService } from 'src/users/user.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { OtpService } from 'src/otps/otp.service';

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
