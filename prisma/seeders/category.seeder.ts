import { PrismaService } from 'src/prisma.service';

export class Category {
    constructor(private readonly prisma?: PrismaService) {}

    async run() {
        await this.seed();
    }

    async seed() {
        await this.prisma.category.createMany({
            data: [
                {
                    name: 'Smartphone',
                    description: 'Choose from wide range of smartphones online at best prices.',
                },
                {
                    name: 'Clothing, Shoes, and Jewellery',
                    description: 'Fashion for a wide selection of clothing, shoes, jewellery and watches.',
                },
                {
                    name: 'Home and Kitchen',
                    description: 'Browse through the wide range of Home and kitchen products.',
                },
                {
                    name: 'Beauty and Personal Care',
                    description: 'Explore beauty and personal care products, shop makeup and etc.',
                },
                {
                    name: 'Books',
                    description: 'Over 25 million titles across categories such as business and et',
                },
                {
                    name: 'Games',
                    description: 'Every month, get exclusive in-game loot, free games, a free subscription.',
                },
                {
                    name: 'Growsari',
                    description: 'Shop grocery Items through at best prices in Indonesia.',
                },
                {
                    name: 'Computer Accessories',
                    description: 'Enhance your computing experience with our range of computer accessories.',
                },
                {
                    name: 'Fitness Tracker',
                    description: 'Monitor your health and fitness goals with our range of advanced fitness trackers.',
                },
            ],
        });
    }
}
