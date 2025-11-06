import type { FC } from 'react';
import { useCartHook } from '@/hooks/useCartHook';
import { priceToDecimal } from '@/lib/priceToDecimal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type ProductCardProps = {
	image: string;
	name: string;
	description: string;
	price: number;
	id: string;
};

export const ProductCard: FC<ProductCardProps> = ({ image, name, id, description, price }) => {
	const { addToCart } = useCartHook();

	return (
		<Card className="bg-neutral-800 rounded-xl overflow-hidden w-[300px] shadow-lg flex flex-col text-start gap-2">
			<CardHeader className="p-0">
				<img className="w-full h-48 object-cover" src={image} alt={name} loading="lazy" />
			</CardHeader>

			<CardContent className="flex-1">
				<CardTitle className="text-xl">{name}</CardTitle>
				<CardDescription className="text-muted-foreground text-md line-clamp-2 leading-5 min-h-10 mb-3">
					{description}
				</CardDescription>
			</CardContent>

			<CardFooter className="w-full justify-between">
				<Button variant="secondary" className="text-xl font-semi" onClick={() => addToCart({ id })}>
					Add to cart
				</Button>
				<p className="text-xl font-semibold">{priceToDecimal(price)} €</p>
			</CardFooter>
		</Card>
	);
};
