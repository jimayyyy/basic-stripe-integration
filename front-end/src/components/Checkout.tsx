import { ShoppingCart } from 'lucide-react';
import type { FC } from 'react';
import { Button } from './ui/button';

interface FloatingCartProps {
	itemCount: number;
	onClick?: () => void;
}

export const FloatingCart: FC<FloatingCartProps> = ({ itemCount, onClick }) => {
	return (
		<Button
			onClick={onClick}
			className="fixed bottom-2 right-2 w-10 h-10 p-0 rounded-full bg-stone-600 hover:bg-stone-950 text-white flex items-center justify-center shadow-lg z-50"
		>
			<ShoppingCart className="w-4 h-4" />

			{itemCount > 0 && (
				<span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
					{itemCount}
				</span>
			)}
		</Button>
	);
};
