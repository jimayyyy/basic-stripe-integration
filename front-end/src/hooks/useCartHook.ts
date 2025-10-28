import { addItem, addToCart, reduceItem, removeItem, type CartItem } from '@/store/cart';
import { useDispatch } from 'react-redux';

export const useCartHook = () => {
	const dispatch = useDispatch();

	return {
		addToCart: (item: Omit<CartItem, 'quantity'>) => dispatch(addToCart(item)),
		addItem: (title: string) => dispatch(addItem({ title })),
		reduceItem: (title: string) => dispatch(reduceItem({ title })),
		removeItem: (title: string) => dispatch(removeItem({ title })),
	};
};
