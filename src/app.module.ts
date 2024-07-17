import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [UsersModule, BcryptModule, PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
