import type { FC } from 'react';
import { Card } from './Card';

export const Product: FC = () => {
	const products = [
		{
			title: 'Café Arabica',
			description: 'Un café doux et aromatique provenant des meilleures plantations.',
			image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
		},
		{
			title: 'Thé Vert Matcha',
			description: 'Thé japonais traditionnel, riche en antioxydants et saveur unique.',
			image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
		},
		{
			title: 'Chocolat Noir',
			description: 'Chocolat riche en cacao, parfait pour les gourmands.',
			image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
		},
	];

	return (
		<div className="flex flex-wrap gap-4 justify-center px-4">
			{products.map((product, index) => (
				<Card key={index} image={product.image} title={product.title} description={product.description} />
			))}
		</div>
	);
};
