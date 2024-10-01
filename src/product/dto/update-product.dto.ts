import { IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum InStock {
    YES = 'YES',
    NO = 'NO',
}

export enum StatusProduct {
    PUBLISHED = 'PUBLISHED',
    INACTIVE = 'INACTIVE',
    SCHEDULED = 'SCHEDULED',
}
export class UpdateProductDto {
    name: string;

    quantity: number;

    description: string;

    SKU: string;

    price: number;

    discount: number;

    inStock: InStock;

    status: StatusProduct;
}
