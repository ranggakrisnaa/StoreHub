import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { PrismaService } from 'src/prisma.service';
import { OtpService } from './otp.service';

@Module({
    providers: [PrismaService, OtpService],
    controllers: [OtpController],
})
export class OtpModule {}
