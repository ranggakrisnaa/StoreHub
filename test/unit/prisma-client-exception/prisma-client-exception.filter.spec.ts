import { PrismaClientExceptionFilter } from '../../../src/prisma-client-exception/prisma-client-exception.filter';

describe('PrismaClientExceptionFilter', () => {
    it('should be defined', () => {
        expect(new PrismaClientExceptionFilter()).toBeDefined();
    });
});
