import { useFetchProductsQuery } from '@/api/productsApi';
import { selectCart } from '@/store/cart';
import priceToDecimal from '@/utils/priceToDecimal';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

interface SummaryProps {
	editable?: boolean;
}

export const Summary: FC<SummaryProps> = () => {
	const cart = useSelector(selectCart);
	const { data: products, isLoading, error } = useFetchProductsQuery();

	if (isLoading) {
		return <div>Loading products...</div>;
	}

	if (error || !products) {
		return <div>Error loading products.</div>;
	}

	return (
		<div className="w-full">
			{cart.map((cartItem) => (
				<div key={cartItem.id} className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2">
					<div className="flex flex-row gap-2 items-center">
						<img
							src={products[cartItem.id].image}
							alt={products[cartItem.id].name}
							className="min-w-16 h-16 object-cover rounded-lg"
						/>
						<div className="flex flex-col justify-start items-start">
							<span className="font-medium overflow-hidden">{products[cartItem.id].name}</span>
							<span className="text-sm text-gray-400">Quantité: {cartItem.quantity}</span>
						</div>
					</div>
					<span className="font-semibold">{priceToDecimal(products[cartItem.id].price)} €</span>
				</div>
			))}
		</div>
	);
};
