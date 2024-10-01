import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from './response/api-response.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(@Res() res: Response): Record<string, any> {
        const data = this.appService.getHello();

        return new ApiResponse(HttpStatus.OK, data);
    }
}
