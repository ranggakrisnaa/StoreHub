import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../../../src/jwt-auth/auth.module';
import { JwtStrategy } from '../../../src/jwt-auth/jwt.strategy';

describe('AuthModule', () => {
    let module: TestingModule;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [AuthModule],
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should import JwtModule with the correct configuration', () => {
        const jwtModule = module.get<JwtModule>(JwtModule);
        expect(jwtModule).toBeDefined();
        expect(jwtModule['options'].secret).toBe('secret');
        expect(jwtModule['options'].signOptions.expiresIn).toBe('60s');
    });

    it('should import PassportModule with the correct strategy', () => {
        const passportModule = module.get<PassportModule>(PassportModule);
        expect(passportModule).toBeDefined();
        expect(passportModule['options'].defaultStrategy).toBe('jwt');
    });

    it('should provide JwtStrategy', () => {
        const jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
        expect(jwtStrategy).toBeDefined();
    });
});
