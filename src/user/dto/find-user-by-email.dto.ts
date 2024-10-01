import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindUserByEmailDto {
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email address' })
    @IsString()
    email: string;
}
