import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { OtpService } from 'src/otps/otp.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TokenService } from 'src/tokens/token.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'private-key',
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [UserController],
    providers: [JwtStrategy, JwtAuthGuard, TokenService, UserService, PrismaService, BcryptService, OtpService],
    exports: [JwtModule, PassportModule],
})
export class UsersModule {}
