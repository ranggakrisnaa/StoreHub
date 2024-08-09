import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
    constructor(private readonly prismaService: PrismaService) {}

    async createProduct() {}
}
