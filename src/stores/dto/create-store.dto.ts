import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStoreDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsNumber()
    villageId: number;
}
