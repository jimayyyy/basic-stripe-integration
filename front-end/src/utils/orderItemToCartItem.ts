import type { OrderItem } from '@/api/orderApi';
import type { CartItem } from '@/store/cart';

export function castOrderItemToProductItem(items: OrderItem[]): CartItem[] {
	return items.map((item) => {
		return {
			id: item.productId,
			quantity: item.quantity,
		};
	});
}
