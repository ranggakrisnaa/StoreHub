import { PrismaService } from '../../src/prisma.service';
export default class Region {
    private readonly prisma?;
    constructor(prisma?: PrismaService);
    run(): Promise<void>;
    private seedProvince;
    private seedCity;
    private seedDistrict;
    private seedVillages;
}
