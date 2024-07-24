import { Body, Controller, Post, Put, Req } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('store')
export class StoreController {
    constructor(private readonly storeService: StoreService) {}

    @Post()
    async createStore(@Body() createStoreDto: CreateStoreDto) {}
    @Put()
    async updateStore(@Body() updateStoreDto: UpdateStoreDto) {}
}
