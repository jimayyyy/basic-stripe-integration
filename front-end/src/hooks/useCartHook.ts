import { addItem, addToCart, reduceItem, removeItem, resetCart, type CartItem } from '@/store/cart';
import { useDispatch } from 'react-redux';

export const useCartHook = () => {
	const dispatch = useDispatch();

	return {
		addToCart: (item: Omit<CartItem, 'quantity'>) => dispatch(addToCart(item)),
		addItem: (id: string) => dispatch(addItem({ id })),
		reduceItem: (id: string) => dispatch(reduceItem({ id })),
		removeItem: (id: string) => dispatch(removeItem({ id })),
		resetCart: () => dispatch(resetCart()),
	};
};
