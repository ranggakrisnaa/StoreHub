import { PrismaService } from 'src/prisma.service';

export class ProductCategory {
    constructor(private readonly prisma?: PrismaService) {}

    public async run(): Promise<void> {
        await this.prisma.productCategories.createMany({
            data: [
                { id: 1, name: 'Pakaian' },
                { id: 2, name: 'Elektronik' },
                { id: 3, name: 'Perabotan' },
                { id: 4, name: 'Mainan' },
                { id: 5, name: 'Kesehatan' },
                { id: 6, name: 'Kecantikan' },
                { id: 7, name: 'Alat Tulis' },
            ],
        });
    }
}
