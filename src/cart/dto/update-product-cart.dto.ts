import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class UpdateProductCartDto {
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsObject()
    token: object;

    @IsObject()
    user: object;
}
