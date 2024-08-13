import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Response } from 'express';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    createStore(createStoreDto: CreateStoreDto, req: Record<any, any>, res: Response): Promise<Record<string, any>>;
    getAllStore(res: Response, req: Record<any, any>): Promise<Record<string, any>>;
    getStore(id: number, res: Response): Promise<Record<string, any>>;
    updateStore(updateStoreDto: UpdateStoreDto, res: Response, id: string): Promise<Record<string, any>>;
}
