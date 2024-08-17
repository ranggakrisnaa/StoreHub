import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SupabaseService } from 'src/supabases/supabase.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    private readonly bucketName: string = process.env.BUCKET_NAME;

    constructor(
        private readonly prisma: PrismaService,
        private readonly supabaseService: SupabaseService,
    ) {}

    async createProduct(createProductDto: CreateProductDto, files: Array<Express.Multer.File>, storeId: number) {
        const productData = await this.prisma.product.create({
            data: {
                ...createProductDto,
                storeId,
            },
        });

        for (let i = 0; i < files.length; i++) {
            const image = files[i];

            const photoUrl = await this.uploadImage(image);
            await this.prisma.productPhotos.create({
                data: {
                    productId: productData.id,
                    photoUrl,
                },
            });

            return;
        }
    }

    async uploadImage(file: Express.Multer.File): Promise<string> {
        const supabase = this.supabaseService.getClient();
        const filePath = `${uuidv4()}-${file.originalname}`;

        const { data, error } = await supabase.storage.from(this.bucketName).upload(filePath, file.buffer);

        return data?.path;
    }
}
