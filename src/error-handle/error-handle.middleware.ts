import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        try {
            next();
        } catch (error) {
            this.handleException(error, res);
        }
    }

    private handleException(error: any, res: Response) {
        if (error instanceof HttpException) {
            res.status(error.getStatus()).json({
                statusCode: error.getStatus(),
                message: error.message,
                error: error.getResponse(),
            });
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal server error',
                error: error.message || 'Unknown error',
            });
        }
    }
}
