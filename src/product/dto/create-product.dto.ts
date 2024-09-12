import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum InStock {
    YES = 'YES',
    NO = 'NO',
}

enum StatusProduct {
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
    inStock: any;

    @IsEnum(StatusProduct)
    status: any;
}
