import { Response } from 'express';

export class ApiResponse<T> {
    private readonly success: boolean = true;
    private readonly statusCode: number;
    private readonly message: string;
    private readonly data: T;

    constructor(statusCode: number, message: string, data?: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    static sendResponse<T>(res: Response, statusCode: number, message: string, data?: T): Response {
        const response = new ApiResponse<T>(statusCode, message, data);
        return res.status(response.statusCode).json(response);
    }
}
