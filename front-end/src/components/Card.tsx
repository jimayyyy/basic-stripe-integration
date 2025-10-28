import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cart';
import { Button } from './ui/button';

type CardProps = {
	image: string;
	title: string;
	description: string;
};

export const Card: FC<CardProps> = ({ image, title, description }) => {
	const dispatch = useDispatch();
	const handleAdd = () => {
		dispatch(addToCart({ title, description, image }));
	};

	return (
		<div className="rounded-xl overflow-hidden shadow-lg bg-white w-[300px] flex flex-col text-start">
			<img className="w-full h-48 object-cover" src={image} alt={title} />
			<div className="flex flex-col justify-between flex-1 p-4">
				<h2 className="text-xl font-bold mb-2 text-gray-900">{title}</h2>
				<p className="text-gray-700 text-base mb-2 flex-1 line-clamp-3">{description}</p>
				<div className="flex justify-between items-center mt-2">
					<Button
						className="text-white px-2 text-xl bg-stone-500 hover:bg-stone-950 ease-out"
						onClick={() => handleAdd()}
					>
						Add to cart
					</Button>
					<div className="text-xl text-black">9.99€</div>
				</div>
			</div>
		</div>
	);
};
