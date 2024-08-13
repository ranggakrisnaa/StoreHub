'use strict';
var __decorate =
    (this && this.__decorate) ||
    function (decorators, target, key, desc) {
        var c = arguments.length,
            r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
            d;
        if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
        if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v);
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.StoreService = void 0;
const common_1 = require('@nestjs/common');
const prisma_service_1 = require('../prisma.service');
let StoreService = class StoreService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createStore(data, userId) {
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
    async createAddressStore(address, storeId, villageId) {
        return this.prisma.address.create({
            data: {
                address,
                Store: { connect: { id: storeId } },
                Village: { connect: { id: villageId } },
            },
        });
    }
    async getStore(where) {
        return this.prisma.store.findFirst({ where });
    }
    async getAllStore(where) {
        return this.prisma.store.findMany({ where });
    }
    async getAddress(where) {
        return this.prisma.address.findFirst({ where });
    }
    async updateStore(data, storeId) {
        const foundStore = await this.getStore({ id: storeId });
        if (!foundStore) throw new common_1.NotFoundException('User store is not found.');
        const { address, villageId, ...storeData } = data;
        const store = await this.prisma.store.update({
            data: storeData,
            where: {
                id: foundStore.id,
            },
        });
        if (address) {
            const foundAddress = await this.getAddress({ storeId: foundStore.id });
            if (!foundAddress) throw new common_1.NotFoundException('User address store is not found.');
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
    async updateAddressStore(params) {
        const { data, where } = params;
        return this.prisma.address.update({
            data,
            where,
        });
    }
    async deleteStore(where) {
        return this.prisma.store.delete({
            where,
        });
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate(
    [(0, common_1.Injectable)(), __metadata('design:paramtypes', [prisma_service_1.PrismaService])],
    StoreService,
);
//# sourceMappingURL=store.service.js.map
