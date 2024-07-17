import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { PassportModule } from '@nestjs/passport';
import { OtpModule } from './otp/otp.module';
import { ConfigModule } from '@nestjs/config';
import otpConfig from './otp/otp.config';

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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
