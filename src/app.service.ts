import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'The server and API is healthy and running smoothly!';
    }
}
