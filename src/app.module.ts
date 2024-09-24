import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { ErrorHandlingMiddleware } from './error-handle/error-handle.middleware';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception/http-exception.filter';
import { CartModule } from './cart/cart.module';

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
        CartModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ErrorHandlingMiddleware).forRoutes('*');
    }
}
