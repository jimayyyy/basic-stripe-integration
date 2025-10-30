import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [PrismaModule],
	exports: [ProductService],
})
export class ProductModule {}
