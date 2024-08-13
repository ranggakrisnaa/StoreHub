import { Response } from 'express';
export declare class ApiResponse<T> {
    private readonly success;
    private statusCode;
    private message;
    private data;
    constructor(statusCode: number, message: string, data?: T);
    sendResponse(res: Response): Response;
}
