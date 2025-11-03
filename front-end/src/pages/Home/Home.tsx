import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '@/components/Product';
import { openSidebar } from '@/store/sidebar';
import { FloatingCart } from '@/components/FloatingCart';
import { useCartHook } from '@/hooks/useCartHook';

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
