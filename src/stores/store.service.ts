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

        await this.createAddressStore(data.address, userId, data.disctrictId);

        return store;
    }

    async createAddressStore(address: string, userId: number, districtId: number): Promise<Address> {
        return this.prisma.address.create({
            data: {
                address,
                User: { connect: { id: userId } },
                Disctrict: { connect: { id: districtId } },
            },
        });
    }
    async getStore(where: Prisma.StoreWhereInput): Promise<Store | null> {
        return this.prisma.store.findFirst({ where });
    }

    async updateStore(data: Prisma.StoreUpdateInput, where: Prisma.StoreWhereUniqueInput): Promise<Store> {
        return this.prisma.store.update({
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
