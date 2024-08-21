import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from '../../../src/store/store.service';

describe('StoreService', () => {
    let service: StoreService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StoreService],
        }).compile();

        service = module.get<StoreService>(StoreService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
