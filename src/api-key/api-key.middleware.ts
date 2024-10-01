import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    private readonly validApiKey = process.env.API_KEY;

    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];

        if (apiKey !== this.validApiKey) throw new UnauthorizedException('Invalid API key authorization');

        return true;
    }
}
