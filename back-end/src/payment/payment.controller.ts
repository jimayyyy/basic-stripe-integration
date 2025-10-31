import { Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Post('create-intent')
	async createPaymentIntent() {
		return this.paymentService.createPaymentIntent(29, 'eur');
	}
}
