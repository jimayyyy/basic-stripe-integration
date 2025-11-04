import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import type { FC } from 'react';

interface FloatingCartProps {
	itemCount: number;
	onClick?: () => void;
}

export const FloatingCart: FC<FloatingCartProps> = ({ itemCount, onClick }) => {
	return (
		<Button
			onClick={onClick}
			variant="default"
			className="fixed bottom-2 right-2 w-10 h-10 p-0 rounded-full text-white flex items-center justify-center shadow-lg"
		>
			<ShoppingCart className="w-4 h-4" />

			{itemCount > 0 && (
				<>
					{itemCount > 9 ? (
						<Badge
							className="h-5 min-w-5 rounded-full px-1 tabular-nums absolute -top-1 -right-1"
							variant="destructive"
						>
							9+
						</Badge>
					) : (
						<Badge
							className="h-5 min-w-5 rounded-full px-1 tabular-nums absolute -top-1 -right-1"
							variant="destructive"
						>
							{itemCount}
						</Badge>
					)}
				</>
			)}
		</Button>
	);
};
