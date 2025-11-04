import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class PaymentService {
	private stripe: Stripe;

	constructor(private readonly prisma: PrismaService) {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
	}

	async createPaymentIntent(createPaymentIntent: CreatePaymentIntentDto) {
		try {
			const order = await this.prisma.order.findUniqueOrThrow({
				where: { id: createPaymentIntent.orderId },
				select: { total: true, status: true },
			});

			if (order.status === OrderStatus.COMPLETED) {
				throw new InternalServerErrorException('');
			}

			const paymentIntent = await this.stripe.paymentIntents.create({
				amount: order.total,
				currency: 'eur',
				automatic_payment_methods: { enabled: true },
				metadata: { orderId: createPaymentIntent.orderId },
			});

			return {
				clientSecret: paymentIntent.client_secret,
			};
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}
}
