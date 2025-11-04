import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { openSidebar } from '@/store/sidebar';
import { useCartHook } from '@/hooks/useCartHook';
import { Product } from './components/ProductList/Product';
import { FloatingCart } from './components/FloatingCart';

export const Home: FC = () => {
	const { totalCount } = useCartHook();
	const dispatch = useDispatch();
	const onOpen = () => dispatch(openSidebar());

	return (
		<div className="w-full h-full">
			<Product />
			<FloatingCart itemCount={totalCount} onClick={() => onOpen()} />
		</div>
	);
};
