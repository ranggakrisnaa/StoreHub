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
var __param =
    (this && this.__param) ||
    function (paramIndex, decorator) {
        return function (target, key) {
            decorator(target, key, paramIndex);
        };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.StoreController = void 0;
const common_1 = require('@nestjs/common');
const store_service_1 = require('./store.service');
const create_store_dto_1 = require('./dto/create-store.dto');
const update_store_dto_1 = require('./dto/update-store.dto');
const jwt_auth_guard_1 = require('../auth/jwt-auth.guard');
const api_response_dto_1 = require('../api-response.dto');
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async createStore(createStoreDto, req, res) {
        try {
            await this.storeService.createStore(createStoreDto, req.user.id);
            return new api_response_dto_1.ApiResponse(
                common_1.HttpStatus.CREATED,
                'Store created successfully.',
            ).sendResponse(res);
        } catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getAllStore(res, req) {
        try {
            const data = await this.storeService.getAllStore({ userId: req.user.id });
            return new api_response_dto_1.ApiResponse(
                common_1.HttpStatus.OK,
                'Store data retrieved successfully.',
                data,
            ).sendResponse(res);
        } catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async getStore(id, res) {
        try {
            const data = await this.storeService.getStore({ id });
            return new api_response_dto_1.ApiResponse(
                common_1.HttpStatus.CREATED,
                'Store data retrieved successfully.',
                data,
            ).sendResponse(res);
        } catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async updateStore(updateStoreDto, res, id) {
        try {
            await this.storeService.updateStore(updateStoreDto, +id);
            return new api_response_dto_1.ApiResponse(
                common_1.HttpStatus.OK,
                'Store updated successfully.',
            ).sendResponse(res);
        } catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
exports.StoreController = StoreController;
__decorate(
    [
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Request)()),
        __param(2, (0, common_1.Res)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [create_store_dto_1.CreateStoreDto, Object, Object]),
        __metadata('design:returntype', Promise),
    ],
    StoreController.prototype,
    'createStore',
    null,
);
__decorate(
    [
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)(),
        __param(0, (0, common_1.Res)()),
        __param(1, (0, common_1.Request)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Object, Object]),
        __metadata('design:returntype', Promise),
    ],
    StoreController.prototype,
    'getAllStore',
    null,
);
__decorate(
    [
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Res)()),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [Number, Object]),
        __metadata('design:returntype', Promise),
    ],
    StoreController.prototype,
    'getStore',
    null,
);
__decorate(
    [
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Res)()),
        __param(2, (0, common_1.Param)('id')),
        __metadata('design:type', Function),
        __metadata('design:paramtypes', [update_store_dto_1.UpdateStoreDto, Object, String]),
        __metadata('design:returntype', Promise),
    ],
    StoreController.prototype,
    'updateStore',
    null,
);
exports.StoreController = StoreController = __decorate(
    [(0, common_1.Controller)('v1/stores'), __metadata('design:paramtypes', [store_service_1.StoreService])],
    StoreController,
);
//# sourceMappingURL=store.controller.js.map
