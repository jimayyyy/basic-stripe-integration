import { IsUUID } from 'class-validator';

export class CreatePaymentIntentDto {
	@IsUUID()
	readonly orderId: string;
}
