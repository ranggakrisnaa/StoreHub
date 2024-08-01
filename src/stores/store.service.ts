import { Injectable } from '@nestjs/common';
import { Address, Prisma, Store } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';

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

    async getAddress(where: Prisma.AddressWhereInput): Promise<Address | null> {
        return this.prisma.address.findFirst({ where });
    }
    async updateStore(params: { where: Prisma.StoreWhereUniqueInput; data: Prisma.StoreUpdateInput }): Promise<Store> {
        const { data, where } = params;
        return this.prisma.store.update({
            data,
            where,
        });
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
