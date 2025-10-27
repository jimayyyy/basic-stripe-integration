import type { FC } from 'react';
import { Product } from '../components/Product';

export const Home: FC = () => {
	return (
		<div className="w-full h-full">
			<Product />
		</div>
	);
};
