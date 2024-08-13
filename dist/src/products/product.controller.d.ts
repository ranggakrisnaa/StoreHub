import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProdutDto: CreateProductDto, req: Record<any, any>, res: Response): Promise<void>;
}
