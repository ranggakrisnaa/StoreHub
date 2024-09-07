import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../../src/auth/jwt.strategy';

describe('JwtStrategy', () => {
    let strategy: JwtStrategy;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JwtStrategy,
                {
                    provide: JwtService,
                    useValue: {
                        verify: jest.fn(),
                    },
                },
            ],
        }).compile();

        strategy = module.get<JwtStrategy>(JwtStrategy);
        jwtService = module.get<JwtService>(JwtService);
    });

    it('should be defined', () => {
        expect(strategy).toBeDefined();
    });

    describe('validate', () => {
        it('should return user payload when token is valid', async () => {
            const payload = { id: 1, username: 'test' };
            jest.spyOn(jwtService, 'verify').mockReturnValue(payload);

            const result = await strategy.validate({ id: 1, username: 'test' });
            expect(result).toEqual(payload);
        });

        it('should throw error if token is invalid', async () => {
            jest.spyOn(jwtService, 'verify').mockImplementation(() => {
                throw new Error('Invalid token');
            });

            await expect(strategy.validate({ id: 1, username: 'test' })).rejects.toThrow('Invalid token');
        });
    });
});
