import { Injectable } from '@nestjs/common';
import { Address, Prisma, Store } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
    constructor(private readonly prisma: PrismaService) {}

    async createStore(data: CreateStoreDto, userId: number): Promise<Store> {
        const store = await this.prisma.store.create({
            data: {
                name: data.name,
                description: data.description,
                User: {
                    connect: { id: userId },
                },
            },
        });

        await this.createAddressStore(data.address, store.id, data.villageId);

        return store;
    }

    async createAddressStore(address: string, storeId: number, villageId: number): Promise<Address> {
        return this.prisma.address.create({
            data: {
                address,
                Store: { connect: { id: storeId } },
                Village: { connect: { id: villageId } },
            },
        });
    }

    async getStore(where: Prisma.StoreWhereInput): Promise<Store | null> {
        return this.prisma.store.findFirst({ where });
    }

    async getAllStore(where: Prisma.StoreWhereInput): Promise<Store[] | null> {
        return this.prisma.store.findMany({ where });
    }

    async getAddress(where: Prisma.AddressWhereInput): Promise<Address | null> {
        return this.prisma.address.findFirst({ where });
    }

    async updateStore(data: UpdateStoreDto, storeId: number): Promise<Store> {
        const foundStore = await this.getStore({ id: storeId });
        const store = this.prisma.store.update({
            data,
            where: {
                id: foundStore.id,
            },
        });

        const foundAddress = await this.getAddress({ storeId: foundStore.id });
        await this.updateAddressStore({
            data: { address: data.address, Village: { connect: { id: data.villageId } } },
            where: { id: foundAddress.id },
        });

        return store;
    }

    async updateAddressStore(params: {
        where: Prisma.AddressWhereUniqueInput;
        data: Prisma.AddressUpdateInput;
    }): Promise<Address> {
        const { data, where } = params;
        return this.prisma.address.update({
            data,
            where,
        });
    }

    async deleteStore(where: Prisma.StoreWhereUniqueInput): Promise<Store> {
        return this.prisma.store.delete({
            where,
        });
    }
}
