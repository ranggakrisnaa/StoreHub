import { Response } from 'express';

export class ApiResponse<T> {
    private readonly success: boolean = true;
    private statusCode: number;
    private message: string;
    private data: T;

    constructor(statusCode: number, message: string, data?: T) {
        this.success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    sendResponse(res: Response): Response {
        return res.status(this.statusCode).json(this);
    }
}
