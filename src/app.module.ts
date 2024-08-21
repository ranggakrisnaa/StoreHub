import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { PassportModule } from '@nestjs/passport';
import { OtpModule } from './otp/otp.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './token/token.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { SupabaseModule } from './supabase/supabase.module';
import { RegionModule } from './region/region.module';
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
        TokenModule,
        StoreModule,
        ProductModule,
        SupabaseModule,
        RegionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
