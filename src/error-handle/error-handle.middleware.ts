import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            next();
        } catch (error) {
            throw error;
        }
    }
}
