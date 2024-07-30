import {
    Body,
    Controller,
    HttpStatus,
    InternalServerErrorException,
    Post,
    Put,
    Req,
    Request,
    Res,
    UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiResponse } from 'src/api-response.dto';
import { Response } from 'express';

@Controller('v1/stores')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createStore(
        @Body() createStoreDto: CreateStoreDto,
        @Request() req: Record<any, any>,
        @Res() res: Response,
    ): Promise<Record<string, any>> {
        try {
            await this.storeService.createStore(createStoreDto, req.user.id);

            return new ApiResponse(HttpStatus.OK, 'Store created successfully.').sendResponse(res);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Put()
    async updateStore(@Body() updateStoreDto: UpdateStoreDto) {
        try {
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
