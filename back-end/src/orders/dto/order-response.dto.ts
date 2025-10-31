export class OrderResponseDto {
	id: string;
	status: string;
	createdAt: Date;
	items: {
		productId: string;
		quantity: number;
		total: number;
	}[];
}
