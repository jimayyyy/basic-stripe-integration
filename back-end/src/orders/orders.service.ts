import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePendingOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';

@Injectable()
export class OrdersService {
	constructor(private readonly prisma: PrismaService) {}

	async findOrderById(id: string): Promise<OrderResponseDto> {
		return this.prisma.order.findUniqueOrThrow({ where: { id }, include: { items: true } });
	}

	async createOrder(order: CreatePendingOrderDto): Promise<OrderResponseDto> {
		try {
			return await this.prisma.$transaction(async (prisma) => {
				let total = 0;
				const internalOrder = await prisma.order.create({ data: {} });

				const products = await prisma.product.findMany({
					where: { id: { in: order.products.map((product) => product.productId) } },
				});

				const productsMap = new Map(products.map((product) => [product.id, product]));

				const orderItemsData = order.products.map((item) => {
					const product = productsMap.get(item.productId);
					if (!product) {
						throw new NotFoundException(`Product with ID ${item.productId} not found`);
					}
					total += product.price * item.quantity;

					return {
						orderId: internalOrder.id,
						productId: item.productId,
						quantity: item.quantity,
						total: product.price * item.quantity,
					};
				});
				await prisma.orderItem.createMany({ data: orderItemsData });
				return prisma.order.update({
					where: { id: internalOrder.id },
					data: { total },
					include: { items: true },
				});
			});
		} catch (err) {
			throw new InternalServerErrorException(`Could not create order: ${err.message}`);
		}
	}
}
