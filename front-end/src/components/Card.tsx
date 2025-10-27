import type { FC } from 'react';
import { Button } from './ui/button';

type CardProps = {
	image: string;
	title: string;
	description: string;
};

export const Card: FC<CardProps> = ({ image, title, description }) => {
	return (
		<div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white">
			<img className="w-full h-48 object-cover" src={image} alt={title} />
			<div className="p-4 text-start">
				<h2 className="text-xl font-bold mb-2 text-red-400">{title}</h2>
				<p className="text-gray-700 text-base mb-2">{description}</p>
				<div className="flex justify-between">
					<Button
						className="text-red-300 px-2 text-xl bg-black hover:bg-red-800 ease-out"
						onClick={() => console.log(title)}
					>
						Add to cart
					</Button>
					<div className="text-xl text-black">9.99€</div>
				</div>
			</div>
		</div>
	);
};
