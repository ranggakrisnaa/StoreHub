import { Test, TestingModule } from '@nestjs/testing';
import { StoreController } from '../../../src/stores/store.controller';
import { StoreService } from '../../../src/stores/store.service';

describe('StoreController', () => {
    let controller: StoreController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreController],
            providers: [StoreService],
        }).compile();

        controller = module.get<StoreController>(StoreController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
