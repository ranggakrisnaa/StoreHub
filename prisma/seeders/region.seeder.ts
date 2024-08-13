import { default as provinces } from '../../public/data/provinces.json';
import { default as cities } from '../../public/data/cities.json';
import { default as districts } from '../../public/data/districts.json';
import { default as villages } from '../../public/data/villages.json';
import { PrismaService } from '../../src/prisma.service';

export default class Region {
    constructor(private readonly prisma?: PrismaService) {}

    public async run(): Promise<void> {
        await this.seedProvince();
        await this.seedCity();
        await this.seedDistrict();
        await this.seedVillages();

        console.log('seeder is completed');
    }

    private async seedProvince(): Promise<void> {
        for (const province of provinces) {
            const foundProvince = await this.prisma.province.findFirst({
                where: {
                    id: +province.id,
                },
            });

            if (!foundProvince)
                await this.prisma.province.create({
                    data: {
                        id: +province.id,
                        name: province.name,
                    },
                });
        }
    }

    private async seedCity(): Promise<void> {
        for (const city of cities) {
            const foundCities = await this.prisma.city.findFirst({
                where: {
                    id: +city.id,
                },
            });

            if (!foundCities)
                await this.prisma.city.create({
                    data: {
                        id: +city.id,
                        provinceId: +city.provinsi_id,
                        name: city.name,
                        type: city.type,
                    },
                });
        }
    }

    private async seedDistrict(): Promise<void> {
        for (const district of districts) {
            const foundDistrict = await this.prisma.district.findFirst({
                where: {
                    id: +district.id,
                },
            });

            if (!foundDistrict)
                await this.prisma.district.create({
                    data: {
                        id: +district.id,
                        cityId: +district.kabupaten_id,
                        name: district.name,
                    },
                });
        }
    }

    private async seedVillages(): Promise<void> {
        if (Array.isArray(villages))
            for (const village of villages) {
                const foundVillage = await this.prisma.village.findFirst({
                    where: {
                        id: +village.id,
                    },
                });

                if (!foundVillage)
                    await this.prisma.village.create({
                        data: {
                            id: +village.id,
                            districtId: +village.kecamatan_id,
                            name: village.name,
                        },
                    });
            }
    }
}
