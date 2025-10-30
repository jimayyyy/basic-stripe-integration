import { Card } from './Card';
import type { FC } from 'react';
import { useProductsHook } from '@/hooks/useProductsHook';

export const Product: FC = () => {
	const { products, error, loading } = useProductsHook();

	if (loading) return <p className="text-center">Chargement des produits...</p>;
	if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

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
