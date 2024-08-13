import { PrismaService } from '../prisma.service';
export declare class ProductService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createProduct(): Promise<void>;
}
