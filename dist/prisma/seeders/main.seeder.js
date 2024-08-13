'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Main = void 0;
const prisma_service_1 = require('../../src/prisma.service');
const region_seeder_1 = __importDefault(require('./region.seeder'));
class Main {
    constructor() {
        this.prismaService = new prisma_service_1.PrismaService();
        this.region = new region_seeder_1.default(this.prismaService);
    }
    async runAll() {
        await this.region.run();
    }
}
exports.Main = Main;
const main = new Main();
main.runAll();
//# sourceMappingURL=main.seeder.js.map
