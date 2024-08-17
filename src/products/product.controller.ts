import {
    Body,
    Controller,
    HttpStatus,
    InternalServerErrorException,
    Param,
    Post,
    Request,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/api-response.dto';

@Controller('v1/products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post(':id')
    async createProduct(
        @Body() createProdutDto: CreateProductDto,
        @UploadedFile() files: Array<Express.Multer.File>,
        @Request() req: Record<any, any>,
        @Param('id') id: string,
        @Res() res: Response,
    ) {
        try {
            await this.productService.createProduct(createProdutDto, files, +id);

            return new ApiResponse(HttpStatus.CREATED, 'Product is created successfully.').sendResponse(res);
        } catch (error) {
            throw error;
        }
    }
}
