'use client';
import { ProductTable } from './components/ProductTable';

export default function Home() {
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-gray-50">
			<ProductTable />
		</div>
	);
}
