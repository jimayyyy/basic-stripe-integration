import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get('/')
	async getProduct(): Promise<Product[]> {
		return this.productService.getProduct();
	}
}
