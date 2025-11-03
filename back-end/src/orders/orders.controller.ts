import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreatePendingOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { EditOrderDto } from './dto/edit-order.dto';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Get(':id')
	async getOrderById(@Param('id') id: string): Promise<OrderResponseDto> {
		return this.ordersService.findOrderById(id);
	}

	@Post()
	async createOrder(@Body() order: CreatePendingOrderDto): Promise<OrderResponseDto> {
		return this.ordersService.createOrder(order);
	}

	@Put(':id')
	async editOrder(@Param('id') id: string, @Body() order: EditOrderDto): Promise<OrderResponseDto> {
		return this.ordersService.editOrder(id, order);
	}
}
