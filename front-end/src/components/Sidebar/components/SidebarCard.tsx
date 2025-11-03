import { Button } from '@/components/ui/button';
import { useCartHook } from '@/hooks/useCartHook';
import { MinusIcon, PlusIcon, X } from 'lucide-react';
import type { FC } from 'react';

type SidebarCardProps = {
	name: string;
	quantity: number;
	image: string;
	id: string;
};

export const SidebarCard: FC<SidebarCardProps> = ({ id, name, quantity, image }) => {
	const { addItem, reduceItem, removeItem } = useCartHook();

	return (
		<>
			<div className="w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-2 flex items-center gap-2 hover:shadow-md transition-shadow relative">
				<Button
					className="absolute -top-3 -left-3 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
					onClick={() => removeItem(id)}
				>
					<X className="text-white" />
				</Button>

				<img src={image} alt={name} className="min-w-16 h-16 object-cover rounded-lg" />

				<div className="flex flex-row justify-between w-full">
					<div className="flex flex-col flex-1 items-start">
						<span className="text-gray-900 font-medium">{name}</span>
						<span className="text-sm text-gray-500">Quantité : {quantity}</span>
					</div>

					<div className="flex flex-col items-center gap-2">
						<Button variant="default" size="sm" className="p-1 h-6 w-6" onClick={() => addItem(id)}>
							<PlusIcon />
						</Button>
						<Button variant="default" size="sm" className="p-1 h-6 w-6" onClick={() => reduceItem(id)}>
							<MinusIcon />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};
