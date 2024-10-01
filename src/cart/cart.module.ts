import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/prisma.service';
import { TokenService } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { OtpService } from 'src/otp/otp.service';

@Module({
    controllers: [CartController],
    providers: [
        CartService,
        PrismaService,
        TokenService,
        JwtService,
        UserService,
        JwtStrategy,
        BcryptService,
        OtpService,
    ],
})
export class CartModule {}
