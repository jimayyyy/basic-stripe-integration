import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';

@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post('create-intent')
	async createPaymentIntent(@Body() body: CreatePaymentIntentDto) {
		return this.paymentService.createPaymentIntent(body);
	}
}
