import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { PrismaService } from 'src/prisma.service';
import { CartItem, Prisma } from '@prisma/client';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    async createProductCart(createProductCartDto: CreateProductCartDto, userId: number): Promise<CartItem> {
        const { user, token, ...restdata } = createProductCartDto;
        const foundProduct = await this.prisma.product.findFirst({ where: { id: restdata.productId } });
        if (!foundProduct) throw new HttpException('Product data is not found.', HttpStatus.NOT_FOUND);

        if (
            createProductCartDto.productIds &&
            createProductCartDto.quantities &&
            createProductCartDto.productIds.length > 0 &&
            createProductCartDto.quantities.length > 0
        ) {
            await this.prisma.cartItem.createMany({
                data: restdata.productIds.map((prodId, i) => ({
                    userId,
                    productId: prodId,
                    quantity: restdata.quantities[i],
                })),
            });

            return;
        }

        return await this.prisma.cartItem.create({
            data: {
                quantity: restdata.quantity,
                productId: restdata.productId,
                userId,
            },
        });
    }

    async getProductCart(): Promise<CartItem[] | null> {
        return await this.prisma.cartItem.findMany();
    }

    async updateProductCart(updateProductCartDto: UpdateProductCartDto) {}

    async deleteProductCart() {}
}
