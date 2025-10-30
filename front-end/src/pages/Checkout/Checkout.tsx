import { useCreateOrderMutation } from '@/api/orderApi';
import { useFetchProductsQuery } from '@/api/productsApi';
import { Button } from '@/components/ui/button';
import useIsMobile from '@/hooks/useIsMobileHook';
import { selectCart } from '@/store/cart';
import priceToDecimal from '@/utils/priceToDecimal';
import clsx from 'clsx';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

export const Checkout: FC = () => {
	const cart = useSelector(selectCart);
	const isMobile = useIsMobile();

	const { data: products, isLoading, error } = useFetchProductsQuery();
	const [createOrder, { data: orderId }] = useCreateOrderMutation();

	const handleOrder = async () => {
		const body = {
			products: [
				{
					productId: '31f4d7cc-2e1d-4c96-a2b9-5dc8b72b8866',
					quantity: 10,
				},
			],
		};

		const id = await createOrder(body).unwrap();
		console.log('OrderID:', id);
	};

	if (isLoading) {
		return <div>Loading products...</div>;
	}

	if (error || !products) {
		return <div>Error loading products.</div>;
	}

	return (
		<div className="flex w-full flex-row justify-center">
			<div className={clsx('flex flex-col p-4 bg-slate-900 rounded-md text-white', isMobile ? 'w-full mx-3' : 'w-1/3')}>
				<h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>

				{cart.map((cartItem) => (
					<div key={cartItem.name} className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2">
						<div className="flex flex-row gap-2 items-center">
							<img
								src={products[cartItem.name].image}
								alt={cartItem.name}
								className="min-w-16 h-16 object-cover rounded-lg"
							/>
							<div className="flex flex-col justify-start items-start">
								<span className="font-medium overflow-hidden">{cartItem.name}</span>
								<span className="text-sm text-gray-400">Quantité: {cartItem.quantity}</span>
							</div>
						</div>
						<span className="font-semibold">{priceToDecimal(products[cartItem.name].price)} €</span>
					</div>
				))}

				<div className="flex justify-between border-gray-700 font-bold text-lg pb-2">
					<span>Total</span>
					<span>
						{priceToDecimal(cart.reduce((total: number, product) => total + product.price * product.quantity, 0))} €
					</span>
				</div>

				{/* Need to create command in backend */}
				<Button className="font-semibold" onClick={() => handleOrder()}>
					Commander
				</Button>
			</div>
		</div>
	);
};
