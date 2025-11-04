import type { FC } from 'react';
import { Button } from './ui/button';
import { useCartHook } from '@/hooks/useCartHook';
import priceToDecimal from '@/utils/priceToDecimal';

type CardProps = {
	image: string;
	name: string;
	description: string;
	price: number;
	id: string;
};

export const Card: FC<CardProps> = ({ image, name, id, description, price }) => {
	const { addToCart } = useCartHook();

	return (
		<div className="rounded-xl overflow-hidden shadow-lg bg-neutral-800 w-[300px] flex flex-col text-start">
			<img className="w-full h-48 object-cover" src={image} alt={name} />
			<div className="flex flex-col justify-between flex-1 p-4">
				<h2 className="text-xl font-bold mb-2">{name}</h2>
				<p className="text-gray-400 text-base mb-2 flex-1 line-clamp-3">{description}</p>
				<div className="flex justify-between items-center mt-2">
					<Button variant="secondary" className="text-xl font-semi" onClick={() => addToCart({ id })}>
						Add to cart
					</Button>
					<p className="text-xl">{priceToDecimal(price)}€</p>
				</div>
			</div>
		</div>
	);
};
