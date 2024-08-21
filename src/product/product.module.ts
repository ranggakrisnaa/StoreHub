import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TokenService } from '../token/token.service';
import { PrismaService } from '../prisma.service';
import { JwtAuthGuard } from '../jwt-auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { JwtStrategy } from '../jwt-auth/jwt.strategy';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { OtpService } from '../otp/otp.service';
import { SupabaseService } from 'src/supabase/supabase.service';
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
        SupabaseService,
    ],
})
export class ProductModule {}
