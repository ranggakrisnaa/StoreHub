import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/response/api-response.dto';
import { ProductImage } from './dto/product-image.dto';

@Controller('v1/products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':storeId')
    async createProduct(
        @Body() createProductDto: CreateProductDto,
        @Param('storeId') storeId: string,
        @Res() res: Response,
    ) {
        const data = await this.productService.createProduct(createProductDto, +storeId);

        return ApiResponse.sendResponse(res, HttpStatus.CREATED, 'Product is created successfully.', data.uuid);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    @Post('/images/:productId')
    async saveProductImage(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Param('productId') productId: string,
        @Res() res: Response,
    ) {
        await this.productService.saveProductImage(files, productId);

        return ApiResponse.sendResponse(res, HttpStatus.CREATED, 'Product image is created successfully.');
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllProduct() {}

    @UseGuards(JwtAuthGuard)
    @Get(':productId')
    async getDetailProduct() {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files'))
    @Put(':productId')
    async updateProduct() {}

    @UseGuards(JwtAuthGuard)
    @Delete(':productId')
    async deleteProduct() {}
}
