import {
    Body,
    Controller,
    Get,
    HttpStatus,
    InternalServerErrorException,
    Param,
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

            return new ApiResponse(HttpStatus.CREATED, 'Store created successfully.').sendResponse(res);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllStore(@Res() res: Response, @Request() req: Record<any, any>): Promise<Record<string, any>> {
        try {
            const data = await this.storeService.getAllStore({ userId: req.user.id });

            return new ApiResponse(HttpStatus.OK, 'Store data retrieved successfully.', data).sendResponse(res);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getStore(@Param('id') id: number, @Res() res: Response): Promise<Record<string, any>> {
        try {
            const data = await this.storeService.getStore({ id });

            return new ApiResponse(HttpStatus.CREATED, 'Store data retrieved successfully.', data).sendResponse(res);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateStore(
        @Body() updateStoreDto: UpdateStoreDto,
        @Res() res: Response,
        @Param('id') id: string,
    ): Promise<Record<string, any>> {
        try {
            await this.storeService.updateStore(updateStoreDto, +id);

            return new ApiResponse(HttpStatus.OK, 'Store updated successfully.').sendResponse(res);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
