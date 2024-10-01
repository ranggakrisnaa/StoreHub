import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductCartDto } from './dto/create-product-cart.dto';
import { ApiResponse } from 'src/response/api-response.dto';
import { Response } from 'express';
import { UpdateProductCartDto } from './dto/update-product-cart.dto';

@Controller('v1/carts')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProductCart(
        @Request() req: Record<any, any>,
        @Body() createProductCartDto: CreateProductCartDto,
        @Res() res: Response,
    ): Promise<Record<string, any>> {
        await this.cartService.createProductCart(createProductCartDto, req.body.user.id);

        return ApiResponse.sendResponse(res, HttpStatus.CREATED, 'Product is added to cart successfully.');
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProductCart(@Res() res: Response): Promise<Record<string, any>> {
        const data = await this.cartService.getProductCart();

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Cart Product data retrieved successfully.', data);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async updateProductCart(
        @Body() updateProductCartDto: UpdateProductCartDto,
        @Request() req: Record<any, any>,
        @Res() res: Response,
    ): Promise<Record<string, any>> {
        await this.cartService.updateProductCart(updateProductCartDto);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Cart Product data retrieved successfully.');
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteProductCart(@Request() req: Record<any, any>, @Res() res: Response): Promise<Record<string, any>> {
        await this.cartService.deleteProductCart();

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Cart Product data retrieved successfully.');
    }
}
