import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
	constructor(private readonly prisma: PrismaService) {}

	async getProduct(): Promise<Product[]> {
		const products = await this.prisma.product.findMany();
		return products;
	}
}
