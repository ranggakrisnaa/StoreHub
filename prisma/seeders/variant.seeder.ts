import { PrismaService } from 'src/prisma.service';

export class Variant {
    constructor(private readonly prisma?: PrismaService) {}

    async run() {
        await this.seed();
    }

    async seed() {
        await this.prisma.variant.createMany({
            data: [{ name: 'size' }, { name: 'color' }, { name: 'weigth' }, { name: 'smell' }],
        });
    }
}
