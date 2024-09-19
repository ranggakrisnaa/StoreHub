import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { isUUID } from 'class-validator';

@Injectable()
export class ProductService {
    private readonly bucketName: string = process.env.BUCKET_NAME;
    private readonly baseUrl: string = process.env.BASE_URL_SUPABASE;

    constructor(
        private readonly prisma: PrismaService,
        private readonly supabaseService: SupabaseService,
    ) {}

    async createProduct(data: CreateProductDto, storeId: number): Promise<Product> {
        const { user, token, ...restdata } = data;

        const foundStore = await this.prisma.store.findFirst({ where: { id: storeId } });
        if (!foundStore) throw new HttpException('Store data is not found.', HttpStatus.NOT_FOUND);

        return await this.prisma.product.create({
            data: {
                ...restdata,
                storeId: foundStore.id,
            },
        });
    }

    async saveProductImage(files: Array<Express.Multer.File>, productId: string): Promise<boolean> {
        const foundProduct = await this.prisma.product.findFirst({ where: { uuid: productId } });
        if (!foundProduct) throw new HttpException('Product data is not found.', HttpStatus.NOT_FOUND);
        if (!files) throw new HttpException('Image data is not found.', HttpStatus.NOT_FOUND);

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

    async getAllProduct(): Promise<Record<string, any>[] | null> {
        return this.prisma.product.findMany({
            select: {
                uuid: true,
                name: true,
                price: true,
                description: true,
                discount: true,
                inStock: true,
                publishDate: true,
                quantity: true,
                SKU: true,
                status: true,
                ProductPhoto: { select: { photoUrl: true } },
            },
        });
    }

    async getDetailProduct(where: Prisma.ProductWhereInput) {
        return this.prisma.product.findFirst({
            where,
            select: {
                uuid: true,
                name: true,
                price: true,
                description: true,
                discount: true,
                inStock: true,
                publishDate: true,
                quantity: true,
                SKU: true,
                status: true,
                ProductPhoto: { select: { photoUrl: true } },
            },
        });
    }

    async getProduct(where: Prisma.ProductWhereInput) {
        return this.prisma.product.findFirst({ where });
    }

    async updateProduct(data: Prisma.ProductUpdateInput, productId: string): Promise<Product> {
        const foundProduct = await this.getProduct({ uuid: productId });
        if (!foundProduct || productId == null)
            throw new HttpException('Product data is not found.', HttpStatus.NOT_FOUND);

        return this.prisma.product.update({
            where: { id: foundProduct.id },
            data: {
                name: data.name || foundProduct.name,
                description: data.description || foundProduct.description,
                SKU: data.SKU || foundProduct.SKU,
                inStock: data.inStock || foundProduct.inStock,
                discount: data.discount || foundProduct.discount,
                price: data.price || foundProduct.price,
                publishDate: data.publishDate || foundProduct.publishDate,
                quantity: data.quantity || foundProduct.quantity,
                status: data.status || foundProduct.status,
            },
        });
    }

    async updateImage(file: Express.Multer.File, oldFilePath: string): Promise<string> {
        const supabase: SupabaseClient = this.supabaseService.getClient();
        const newFilePath = `${uuidv4()}-${file.originalname}`;

        const { error: removeError } = await supabase.storage.from(this.bucketName).remove([oldFilePath]);
        if (removeError && removeError.message !== 'The resource was not found') {
            throw new HttpException(removeError.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(this.bucketName)
            .upload(newFilePath, file.buffer, {
                contentType: file.mimetype,
            });

        if (uploadError) {
            throw new HttpException(uploadError.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return `${this.baseUrl}${uploadData.path}`;
    }

    async updateProductImage(files: Array<Express.Multer.File>, productId: string, productPhotoId: number) {
        if (!isUUID(productId)) throw new HttpException('Invalid productId format', HttpStatus.BAD_REQUEST);
        if (!files) throw new HttpException('Image data is not found.', HttpStatus.NOT_FOUND);

        const foundProduct = await this.getProduct({ uuid: productId });
        if (!foundProduct) throw new HttpException('Product data is not found.', HttpStatus.NOT_FOUND);

        const foundProductPhoto = await this.prisma.productPhoto.findFirst({ where: { id: productPhotoId } });
        if (!foundProductPhoto) throw new HttpException('Product data is not found.', HttpStatus.NOT_FOUND);

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const photoUrl = await this.updateImage(files[i], foundProductPhoto.photoUrl.split('\\').pop());
                await this.prisma.productPhoto.update({
                    data: {
                        productId: foundProduct.id,
                        photoUrl,
                    },
                    where: {
                        id: productPhotoId,
                    },
                });
            }
        } else {
            const photoUrl = await this.updateImage(files[0], foundProductPhoto.photoUrl.split('\\').pop());
            await this.prisma.productPhoto.update({
                data: {
                    productId: foundProduct.id,
                    photoUrl,
                },
                where: {
                    id: productPhotoId,
                },
            });
        }

        return true;
    }
}
