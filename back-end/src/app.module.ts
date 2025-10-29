import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { PrismaService } from './prisma/prisma.service';

@Module({
	imports: [],
	controllers: [AppController, ProductController],
	providers: [AppService, ProductService, PrismaService],
})
export class AppModule {}
