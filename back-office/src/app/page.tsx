'use client';
import { useProducts } from '@/hooks/useProduct';

export default function Home() {
	const { data: products, isLoading } = useProducts();

	console.log('products :', products);

	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">Hello world</div>
	);
}
