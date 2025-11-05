import { useFetchProductsQuery } from '@/api/productsApi';
import { selectCart, type CartItem } from '@/store/cart';
import priceToDecimal from '@/utils/priceToDecimal';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useCartHook } from '@/hooks/useCartHook';
import useIsMobile from '@/hooks/useIsMobileHook';
import { Button } from '@/components/ui/button';

interface SummaryProps {
	editable?: boolean;
	items?: CartItem[];
}

export const Summary: FC<SummaryProps> = ({ editable = false, items }) => {
	const storeCart = useSelector(selectCart);
	const cart = items && items.length > 0 ? items : storeCart;

	const isMobile = useIsMobile();
	const { addItem, reduceItem } = useCartHook();

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
						{!isMobile && (
							<img
								src={products[cartItem.id].image}
								alt={products[cartItem.id].name}
								className="min-w-16 h-16 object-cover rounded-lg"
							/>
						)}
						<div className="flex flex-col justify-start items-start">
							<span className="font-medium overflow-hidden">{products[cartItem.id].name}</span>
							<span className="text-sm text-gray-400">Quantité: {cartItem.quantity}</span>
						</div>
					</div>
					<div className="flex flex-row items-center gap-2">
						<span className="font-semibold">{priceToDecimal(products[cartItem.id].price)} €</span>
						{editable && (
							<div className="flex flex-col items-center gap-2">
								<Button variant="secondary" size="sm" className="p-1 h-6 w-6" onClick={() => addItem(cartItem.id)}>
									<PlusIcon />
								</Button>
								<Button variant="secondary" size="sm" className="p-1 h-6 w-6" onClick={() => reduceItem(cartItem.id)}>
									<MinusIcon />
								</Button>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
};
