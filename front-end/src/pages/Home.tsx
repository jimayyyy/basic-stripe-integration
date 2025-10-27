import type { FC } from 'react';
import { FloatingCart } from '@/components/Checkout';
import { useSelector } from 'react-redux';
import { selectCartCount } from '@/store/cart';
import type { RootState } from '@/store/store';
import { Product } from '@/components/Product';

export const Home: FC = () => {
	const totalCount = useSelector((state: RootState) => selectCartCount(state));

	return (
		<div className="w-full h-full">
			<Product />
			<FloatingCart itemCount={totalCount} onClick={() => console.log('floating cart')} />
		</div>
	);
};
