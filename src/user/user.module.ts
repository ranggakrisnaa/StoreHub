import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../auth/jwt.strategy';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TokenService } from '../token/token.service';
import { PrismaService } from '../prisma.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { OtpService } from '../otp/otp.service';

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
