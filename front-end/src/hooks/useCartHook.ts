import {
	addItem,
	addToCart,
	reduceItem,
	removeItem,
	resetCart,
	selectCart,
	selectCartCount,
	selectCartTotal,
	type CartItem,
} from '@/store/cart';
import type { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

export const useCartHook = () => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const totalCount = useSelector((state: RootState) => selectCartCount(state));
	const totalPrice = useSelector(selectCartTotal);

	return {
		addToCart: (item: Omit<CartItem, 'quantity'>) => dispatch(addToCart(item)),
		addItem: (id: string) => dispatch(addItem({ id })),
		reduceItem: (id: string) => dispatch(reduceItem({ id })),
		removeItem: (id: string) => dispatch(removeItem({ id })),
		resetCart: () => dispatch(resetCart()),
		cart,
		totalCount,
		totalPrice,
	};
};
