import type { OrderItem } from '@/api/orderApi';
import type { CartItem } from '@/store/cart';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function castOrderItemToProductItem(items: OrderItem[]): CartItem[] {
	return items.map((item) => {
		return {
			id: item.productId,
			quantity: item.quantity,
		};
	});
}
