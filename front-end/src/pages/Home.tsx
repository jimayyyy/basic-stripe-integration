import type { FC } from 'react';
import { Product } from '../components/Product';
import { FloatingCart } from '@/components/Checkout';

export const Home: FC = () => {
	return (
		<div className="w-full h-full">
			<Product />
			<FloatingCart itemCount={5} onClick={() => console.log('floating cart')} />
		</div>
	);
};
