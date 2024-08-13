import { Address, Prisma, Store } from '@prisma/client';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from '../prisma.service';
export declare class StoreService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createStore(data: CreateStoreDto, userId: number): Promise<Store>;
    createAddressStore(address: string, storeId: number, villageId: number): Promise<Address>;
    getStore(where: Prisma.StoreWhereInput): Promise<Store | null>;
    getAllStore(where: Prisma.StoreWhereInput): Promise<Store[] | null>;
    getAddress(where: Prisma.AddressWhereInput): Promise<Address | null>;
    updateStore(data: UpdateStoreDto, storeId: number): Promise<Store>;
    updateAddressStore(params: {
        where: Prisma.AddressWhereUniqueInput;
        data: Prisma.AddressUpdateInput;
    }): Promise<Address>;
    deleteStore(where: Prisma.StoreWhereUniqueInput): Promise<Store>;
}
