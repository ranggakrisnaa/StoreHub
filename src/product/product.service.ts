import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
    private readonly bucketName: string = process.env.BUCKET_NAME;
    private readonly baseUrl: string = process.env.BASE_URL_SUPABASE;

    constructor(
        private readonly prisma: PrismaService,
        private readonly supabaseService: SupabaseService,
    ) {}

    async createProduct(data: CreateProductDto, storeId: number): Promise<Product> {
        const foundStore = await this.prisma.store.findFirst({ where: { id: storeId } });
        if (!foundStore) throw new HttpException('Store data is not found.', HttpStatus.NOT_FOUND);

        return await this.create({ ...data, Store: { connect: { id: foundStore.id } } });
    }

    async saveProductImage(files: Array<Express.Multer.File>, productId: string): Promise<boolean> {
        const foundProduct = await this.prisma.product.findFirst({ where: { uuid: productId } });
        if (!foundProduct) throw new HttpException('Store data is not found.', HttpStatus.NOT_FOUND);

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const image = files[i];
                const photoUrl = await this.uploadImage(image);

                await this.prisma.productPhoto.create({
                    data: {
                        productId: foundProduct.id,
                        photoUrl,
                    },
                });
            }
        } else {
            const photoUrl = await this.uploadImage(files[0]);
            await this.prisma.productPhoto.create({
                data: {
                    productId: foundProduct.id,
                    photoUrl,
                },
            });
        }

        return true;
    }

    async create(data: Prisma.ProductCreateInput): Promise<Product> {
        return this.prisma.product.create({
            data,
        });
    }

    async uploadImage(file: Express.Multer.File): Promise<string> {
        const supabase = this.supabaseService.getClient();
        const filePath = `${uuidv4()}-${file.originalname}`;

        const { data, error } = await supabase.storage.from(this.bucketName).upload(filePath, file.buffer);
        if (error) throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);

        return `${this.baseUrl}${data.path}`;
    }
}
