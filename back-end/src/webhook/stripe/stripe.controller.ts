import { Controller, Post, Req, Res, Headers } from '@nestjs/common';
import Stripe from 'stripe';
import { Response, Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Controller('webhook')
export class StripeWebhookController {
	private stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '');

	constructor(private readonly prisma: PrismaService) {}

	@Post('stripe')
	async handleWebhook(@Req() req: Request, @Res() res: Response, @Headers('stripe-signature') signature: string) {
		let event: Stripe.Event;

		try {
			event = this.stripe.webhooks.constructEvent(
				req.body as string | Buffer,
				signature,
				process.env.STRIPE_WEBHOOK_SECRET ?? '',
			);
		} catch (err) {
			return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
		}

		if (event.type === 'payment_intent.succeeded') {
			const paymentIntent = event.data.object;

			const orderId = paymentIntent.metadata?.orderId;

			if (orderId) {
				await this.prisma.order.update({
					where: { id: orderId },
					data: { status: OrderStatus.COMPLETED },
				});
			}
		}

		res.json({ received: true });
	}
}
