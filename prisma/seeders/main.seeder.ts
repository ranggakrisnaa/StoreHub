import { PrismaService } from '../../src/prisma.service';
import { Region } from './region.seeder';

export class Main {
    private prismaService: PrismaService;
    private region: Region;

    constructor() {
        this.prismaService = new PrismaService();
        this.region = new Region(this.prismaService);
    }

    public async runAll(): Promise<void> {
        await this.region.run();
    }
}

const main = new Main();
main.runAll();
