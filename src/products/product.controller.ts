import { Body, Controller, InternalServerErrorException, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';

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
