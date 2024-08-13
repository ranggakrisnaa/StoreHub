'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const provinces_json_1 = __importDefault(require('../../public/data/provinces.json'));
const cities_json_1 = __importDefault(require('../../public/data/cities.json'));
const districts_json_1 = __importDefault(require('../../public/data/districts.json'));
const villages_json_1 = __importDefault(require('../../public/data/villages.json'));
class Region {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async run() {
        await this.seedProvince();
        await this.seedCity();
        await this.seedDistrict();
        await this.seedVillages();
        console.log('seeder is completed');
    }
    async seedProvince() {
        for (const province of provinces_json_1.default) {
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
    async seedCity() {
        for (const city of cities_json_1.default) {
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
    async seedDistrict() {
        for (const district of districts_json_1.default) {
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
    async seedVillages() {
        if (Array.isArray(villages_json_1.default))
            for (const village of villages_json_1.default) {
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
exports.default = Region;
//# sourceMappingURL=region.seeder.js.map
