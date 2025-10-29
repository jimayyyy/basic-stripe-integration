import { Button } from '@/components/ui/button';
import { selectCart } from '@/store/cart';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

export const Checkout: FC = () => {
	const products = useSelector(selectCart);

	return (
		<div className="flex w-full flex-row gap-4 justify-center">
			<div className="flex min-w-[300px] flex-col p-4 bg-slate-900 rounded-md text-white">
				<h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>

				{products.map((product) => (
					<div key={product.name} className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2">
						<div className="flex flex-row gap-2 items-center">
							<img src={product.image} alt={product.name} className="min-w-16 h-16 object-cover rounded-lg" />
							<div className="flex flex-col justify-start items-start">
								<span className="font-medium overflow-hidden">{product.name}</span>
								<span className="text-sm text-gray-400">Quantité: {product.quantity}</span>
							</div>
						</div>
						<span className="font-semibold">{99 * product.quantity} €</span>
					</div>
				))}

				<div className="flex justify-between border-gray-700 font-bold text-lg">
					<span>Total</span>
					<span>{products.reduce((total, product) => total + 99 * product.quantity, 0)} €</span>
				</div>

				{/* Need to create command in backend */}
				<Button className="font-semibold">Commander</Button>
			</div>
		</div>
	);
};
