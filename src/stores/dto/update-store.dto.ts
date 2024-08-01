import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UpdateStoreDto {
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
