import { useFetchProductsQuery } from '@/api/productsApi';
import type { FC } from 'react';
import { ProductCard } from './Card/ProductCard';

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
			{Object.keys(products).map((productId) => (
				<ProductCard
					key={productId}
					image={
						products[productId].image ??
						'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg'
					}
					name={products[productId].name}
					description={products[productId].description}
					price={products[productId].price}
					id={productId}
				/>
			))}
		</div>
	);
};
