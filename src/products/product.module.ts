import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TokenService } from 'src/tokens/token.service';
import { PrismaService } from 'src/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from 'src/users/user.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { OtpService } from 'src/otps/otp.service';

@Module({
    controllers: [ProductController],
    providers: [
        ProductService,
        TokenService,
        PrismaService,
        JwtAuthGuard,
        UserService,
        JwtStrategy,
        BcryptService,
        OtpService,
    ],
})
export class ProductModule {}
