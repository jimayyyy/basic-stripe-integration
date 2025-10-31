import { Module } from '@nestjs/common';
import { StripeWebhookController } from './stripe/stripe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	controllers: [StripeWebhookController],
	imports: [PrismaModule],
})
export class WebhookModule {}
