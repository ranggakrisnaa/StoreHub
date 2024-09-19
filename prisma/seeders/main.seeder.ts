import { PrismaService } from '../../src/prisma.service';
import { Category } from './category.seeder';
import { Region } from './region.seeder';
import { Variant } from './variant.seeder';

export class Main {
    private prismaService: PrismaService;
    private region: Region;
    private category: Category;
    private variant: Variant;

    constructor() {
        this.prismaService = new PrismaService();
        this.region = new Region(this.prismaService);
        this.category = new Category(this.prismaService);
        this.variant = new Variant(this.prismaService);
    }

    public async runAll(): Promise<void> {
        await this.region.run();
        await this.category.run();
        await this.variant.run();
    }
}

const main = new Main();
main.runAll();
