import { Injectable, NotFoundException } from '@nestjs/common';
import { Address, Prisma, Store } from '@prisma/client';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { PrismaService } from '../prisma.service';

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
        if (!foundStore) throw new NotFoundException('User store is not found.');

        const { address, villageId, ...storeData } = data;

        const store = await this.prisma.store.update({
            data: storeData,
            where: {
                id: foundStore.id,
            },
        });

        if (address) {
            const foundAddress = await this.getAddress({ storeId: foundStore.id });
            if (!foundAddress) throw new NotFoundException('User address store is not found.');

            await this.updateAddressStore({
                data: {
                    address,
                    Village: { connect: { id: villageId } },
                },
                where: { id: foundAddress.id },
            });
        }

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
