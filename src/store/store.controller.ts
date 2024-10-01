import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiResponse } from '../response/api-response.dto';

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
        await this.storeService.createStore(createStoreDto, +req.body.user.id);

        return ApiResponse.sendResponse(res, HttpStatus.CREATED, 'Store created successfully.');
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllStore(@Res() res: Response, @Request() req: Record<any, any>): Promise<Record<string, any>> {
        const data = await this.storeService.getAllStore({ userId: req.user.id });

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Store data retrieved successfully.', data);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getStore(@Param('id') id: number, @Res() res: Response): Promise<Record<string, any>> {
        const data = await this.storeService.getStore({ id });

        return ApiResponse.sendResponse(res, HttpStatus.CREATED, 'Store data retrieved successfully.', data);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateStore(
        @Body() updateStoreDto: UpdateStoreDto,
        @Res() res: Response,
        @Param('id') id: string,
    ): Promise<Record<string, any>> {
        await this.storeService.updateStore(updateStoreDto, +id);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Store updated successfully.');
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteStore(@Param('id') id: string, @Res() res: Response) {
        await this.storeService.deleteStore({ id: +id });

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Store deleted successfully.');
    }
}
