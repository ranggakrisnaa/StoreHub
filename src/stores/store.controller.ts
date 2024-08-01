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

            return new ApiResponse(HttpStatus.CREATED, 'Store created successfully.').sendResponse(res);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateStore(
        @Body() updateStoreDto: UpdateStoreDto,
        @Request() req: Record<any, any>,
        @Res() res: Response,
    ): Promise<Record<string, any>> {
        try {
            const foundStore = await this.storeService.getStore({ userId: req.user.id });
            await this.storeService.updateStore({
                data: {
                    name: updateStoreDto.name || foundStore.name,
                    description: updateStoreDto.description || foundStore.description,
                },
                where: { id: foundStore.id },
            });

            const foundAddress = await this.storeService.getAddress({ storeId: foundStore.id });
            await this.storeService.updateAddressStore({
                data: { address: updateStoreDto.address, Village: { connect: { id: updateStoreDto.villageId } } },
                where: { id: foundAddress.id },
            });

            return new ApiResponse(HttpStatus.OK, 'Store updated successfully.').sendResponse(res);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
