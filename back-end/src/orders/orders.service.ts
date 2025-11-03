import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePendingOrderDto, OrderProductDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderStatus, Prisma, Product } from '@prisma/client';

@Injectable()
export class OrdersService {
	constructor(private readonly prisma: PrismaService) {}

	private async prepareOrderItems(
		prisma: Prisma.TransactionClient,
		orderId: string,
		productsInput: OrderProductDto[],
	): Promise<{ total: number; orderItems: any[] }> {
		let total = 0;

		const products: Product[] = await prisma.product.findMany({
			where: { id: { in: productsInput.map((product) => product.id) } },
		});

		const productsMap = new Map(products.map((product) => [product.id, product]));

		const orderItemsData: Prisma.OrderItemCreateManyInput[] = productsInput.map((item) => {
			const product = productsMap.get(item.id);
			if (!product) {
				throw new NotFoundException(`Product with ID ${item.id} not found`);
			}
			total += product.price * item.quantity;

			return {
				orderId: orderId,
				productId: item.id,
				quantity: item.quantity,
				total: product.price * item.quantity,
			};
		});

		return { total, orderItems: orderItemsData };
	}

	async findOrderById(id: string): Promise<OrderResponseDto> {
		return this.prisma.order.findUniqueOrThrow({ where: { id }, include: { items: true } });
	}

	async createOrder(order: CreatePendingOrderDto): Promise<OrderResponseDto> {
		try {
			return await this.prisma.$transaction(async (tx) => {
				const internalOrder = await tx.order.create({ data: {} });
				const { total, orderItems } = await this.prepareOrderItems(tx, internalOrder.id, order.products);

				await tx.orderItem.createMany({ data: orderItems });
				return tx.order.update({
					where: { id: internalOrder.id },
					data: { total },
					include: { items: true },
				});
			});
		} catch (err) {
			throw new InternalServerErrorException(`Could not create order: ${err.message}`);
		}
	}

	async editOrder(id: string, order: CreatePendingOrderDto): Promise<OrderResponseDto> {
		try {
			const existOrder = await this.prisma.order.findUniqueOrThrow({ where: { id } });
			if (existOrder.status === OrderStatus.COMPLETED) {
				throw new InternalServerErrorException(`Cannot edit a completed order (id: ${id})`);
			}

			return await this.prisma.$transaction(async (tx) => {
				await tx.orderItem.deleteMany({
					where: { orderId: existOrder.id },
				});

				const { total, orderItems } = await this.prepareOrderItems(tx, existOrder.id, order.products);
				await tx.orderItem.createMany({ data: orderItems });

				return tx.order.update({
					where: { id },
					data: { total },
					include: { items: true },
				});
			});
		} catch (err) {
			throw new InternalServerErrorException(`Could not edit order (id: ${id}): ${err.message}`);
		}
	}
}
