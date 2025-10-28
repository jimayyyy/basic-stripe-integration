import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartCount } from '@/store/cart';
import type { RootState } from '@/store/store';
import { Product } from '@/components/Product';
import { openSidebar } from '@/store/sidebar';
import { FloatingCart } from '@/components/FloatingCart';

export const Home: FC = () => {
	const totalCount = useSelector((state: RootState) => selectCartCount(state));
	const dispatch = useDispatch();
	const onOpen = () => dispatch(openSidebar());

	return (
		<div className="w-full h-full">
			<Product />
			<FloatingCart itemCount={totalCount} onClick={() => onOpen()} />
		</div>
	);
};
