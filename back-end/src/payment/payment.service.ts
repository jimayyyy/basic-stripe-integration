import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
	private stripe: Stripe;

	constructor() {
		this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
	}

	async createPaymentIntent(amount: number, currency = 'eur') {
		try {
			const paymentIntent = await this.stripe.paymentIntents.create({
				amount: amount * 100,
				currency,
				automatic_payment_methods: { enabled: true },
				metadata: { orderId: '3595e69a-cac1-4d56-98bb-94ddab86b2ce' },
			});

			return {
				clientSecret: paymentIntent.client_secret,
			};
		} catch (e) {
			throw new InternalServerErrorException(e.message);
		}
	}
}
