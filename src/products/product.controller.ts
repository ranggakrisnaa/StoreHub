import { Body, Controller, InternalServerErrorException, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('v1/products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async createProduct(
        @Body() createProdutDto: CreateProductDto,
        @Request() req: Record<any, any>,
        @Res() res: Response,
    ) {
        try {
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
