import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../../src/products/product.controller';
import { ProductService } from '../../../src/products/product.service';

describe('ProductController', () => {
    let controller: ProductController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [ProductService],
        }).compile();

        controller = module.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
