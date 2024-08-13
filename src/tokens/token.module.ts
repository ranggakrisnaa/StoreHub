import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [TokenController],
    providers: [PrismaService, TokenService],
})
export class TokenModule {}
