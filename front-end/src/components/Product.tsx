import { useFetchProductsQuery } from '@/api/productsApi';
import { Card } from './Card';
import type { FC } from 'react';

export const Product: FC = () => {
	const { data: products, isLoading, error } = useFetchProductsQuery();

	if (isLoading) {
		return <div>Loading products...</div>;
	}

	if (error || !products) {
		return <div>Error loading products.</div>;
	}

	return (
		<div className="flex flex-wrap gap-4 justify-center px-4">
			{Object.keys(products).map((name, index) => (
				<Card
					key={index}
					image={
						products[name].image ?? 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
					}
					name={name}
					description={products[name].description}
					price={products[name].price}
				/>
			))}
		</div>
	);
};
