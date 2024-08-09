import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/user.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { PassportModule } from '@nestjs/passport';
import { OtpModule } from './otps/otp.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './tokens/token.module';
import { StoreModule } from './stores/store.module';
import { ProductController } from './products/product.controller';
import { ProductModule } from './products/product.module';
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
        StoreModule,
        ProductModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
