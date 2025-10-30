import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreatePendingOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get(':id')
	async getOrderById(@Param('id') id: string) {
		return id;
	}

	@Post()
	async createOrder(@Body() order: CreatePendingOrderDto) {
		return order;
	}
}
