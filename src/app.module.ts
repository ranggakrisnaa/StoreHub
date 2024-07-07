import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UsersModule, BcryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
