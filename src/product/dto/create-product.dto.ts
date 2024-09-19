import { IsEnum, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export enum InStock {
    YES = 'YES',
    NO = 'NO',
}

export enum StatusProduct {
    PUBLISHED = 'PUBLISHED',
    INACTIVE = 'INACTIVE',
    SCHEDULED = 'SCHEDULED',
}
export class CreateProductDto {
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

    @IsNumber()
    @IsNotEmpty()
    discount: number;

    @IsEnum(InStock)
    inStock: InStock;

    @IsEnum(StatusProduct)
    status: StatusProduct;

    @IsObject()
    token: object;

    @IsObject()
    user: object;
}
