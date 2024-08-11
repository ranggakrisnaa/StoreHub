import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNumber()
    @IsNotEmpty()
    productCategoryId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    SKU: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
