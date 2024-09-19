import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
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
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('v1/products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @Post(':storeId')
    async createProduct(
        @Body() createProductDto: CreateProductDto,
        @Param('storeId') storeId: string,
        @Res() res: Response,
    ): Promise<Record<string, any>> {
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
    ): Promise<Record<string, any>> {
        await this.productService.saveProductImage(files, productId);

        return ApiResponse.sendResponse(res, HttpStatus.CREATED, 'Product image is created successfully.');
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllProduct(@Res() res: Response): Promise<Record<string, any>> {
        const data = await this.productService.getAllProduct();

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Product data retrieved successfully.', data);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':productId')
    async getDetailProduct(@Param('productId') productId: string, @Res() res: Response): Promise<Record<string, any>> {
        const data = await this.productService.getDetailProduct({ uuid: productId });

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Product data retrieved successfully.', data);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':productId')
    async updateProduct(
        @Body() updateProductDto: UpdateProductDto,
        @Param('productId') productId: string,
        @Res() res: Response,
    ): Promise<Record<string, any>> {
        const data = await this.productService.updateProduct(updateProductDto, productId);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Product data updated successfully.', data);
    }

    @UseGuards(JwtAuthGuard)
    @Put('images/:productId')
    @UseInterceptors(FilesInterceptor('files'))
    async updateProductImage(
        @UploadedFiles() files: Array<Express.Multer.File>,
        @Param('productId') productId: string,
        @Query('productPhotoId') productPhotoId: string,
        @Res() res: Response,
    ): Promise<Record<string, any>> {
        console.log({ productId });
        const data = await this.productService.updateProductImage(files, productId, +productPhotoId);

        return ApiResponse.sendResponse(res, HttpStatus.OK, 'Product data image updated successfully.', data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':productId')
    async deleteProduct(@Res() res: Response) {}
}
