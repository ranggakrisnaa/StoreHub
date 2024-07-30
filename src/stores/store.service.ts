import { Injectable } from '@nestjs/common';
import { Prisma, Store } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StoreService {
    constructor(private readonly prisma: PrismaService) {}

    async createStore(data: Prisma.StoreCreateWithoutUserInput, userId: number): Promise<Store> {
        return this.prisma.store.create({
            data: {
                ...data,
                User: {
                    connect: {
                        id: userId,
                    },
                },
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
