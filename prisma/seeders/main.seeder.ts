import { PrismaService } from '../../src/prisma.service';
import { ProductCategory } from './productCategory.seeder';
import { Region } from './region.seeder';

export class Main {
    private prismaService: PrismaService;
    private region: Region;
    private productCategory: ProductCategory;

    constructor() {
        this.prismaService = new PrismaService();
        this.region = new Region(this.prismaService);
        this.productCategory = new ProductCategory(this.prismaService);
    }

    public async runAll(): Promise<void> {
        await this.region.run();
        await this.productCategory.run();
    }
}

const main = new Main();
main.runAll();
