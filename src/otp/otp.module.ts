import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { PrismaService } from '../prisma.service';

@Module({
    providers: [PrismaService, OtpService],
    controllers: [OtpController],
})
export class OtpModule {}
