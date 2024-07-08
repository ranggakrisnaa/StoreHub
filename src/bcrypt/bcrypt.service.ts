import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    hashPassword(password: string): string {
        const saltOrRounds = 10;
        return bcrypt.hashSync(password, saltOrRounds);
    }

    comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
}
