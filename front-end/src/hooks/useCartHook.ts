import { addItem, addToCart, reduceItem, removeItem, resetCart, selectCartCount, type CartItem } from '@/store/cart';
import type { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

export const useCartHook = () => {
	const dispatch = useDispatch();
	const totalCount = useSelector((state: RootState) => selectCartCount(state));

	return {
		addToCart: (item: Omit<CartItem, 'quantity'>) => dispatch(addToCart(item)),
		addItem: (id: string) => dispatch(addItem({ id })),
		reduceItem: (id: string) => dispatch(reduceItem({ id })),
		removeItem: (id: string) => dispatch(removeItem({ id })),
		resetCart: () => dispatch(resetCart()),
		totalCount,
	};
};
