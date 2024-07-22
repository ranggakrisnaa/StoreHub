import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { PassportModule } from '@nestjs/passport';
import { OtpModule } from './otps/otp.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './tokens/token.module';
import otpConfig from './otps/otp.config';

@Module({
    imports: [
        UsersModule,
        OtpModule,
        BcryptModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule.forRoot({
            load: [otpConfig],
            isGlobal: true,
        }),
        TokenModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
