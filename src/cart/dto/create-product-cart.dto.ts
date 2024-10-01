import { IsNotEmpty, IsNumber, IsObject, ValidateIf } from 'class-validator';

export class CreateProductCartDto {
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    @IsNumber()
    productId: number;

    productIds: [];

    quantities: [];

    @IsObject()
    token: object;

    @IsObject()
    user: object;
}
