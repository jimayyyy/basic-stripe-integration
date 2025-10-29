import { addItem, addToCart, reduceItem, removeItem, resetCart, type CartItem } from '@/store/cart';
import { useDispatch } from 'react-redux';

export const useCartHook = () => {
	const dispatch = useDispatch();

	return {
		addToCart: (item: Omit<CartItem, 'quantity'>) => dispatch(addToCart(item)),
		addItem: (name: string) => dispatch(addItem({ name })),
		reduceItem: (name: string) => dispatch(reduceItem({ name })),
		removeItem: (name: string) => dispatch(removeItem({ name })),
		resetCart: () => dispatch(resetCart()),
	};
};
