import { useSelector } from 'react-redux';
import { Card } from './Card';
import { selectProductsError, selectProductsLoading } from '@/store/products';
import type { FC } from 'react';
import { useProductsHook } from '@/hooks/useProductsHook';

export const Product: FC = () => {
	const { products } = useProductsHook();
	const loading = useSelector(selectProductsLoading);
	const error = useSelector(selectProductsError);

	if (loading) return <p className="text-center">Chargement des produits...</p>;
	if (error) return <p className="text-center text-red-500">Erreur : {error}</p>;

	return (
		<div className="flex flex-wrap gap-4 justify-center px-4">
			{products.map((product, index) => (
				<Card
					key={index}
					image={product.image || 'https://via.placeholder.com/400x300?text=Produit'}
					name={product.name}
					description={product.description}
				/>
			))}
		</div>
	);
};
