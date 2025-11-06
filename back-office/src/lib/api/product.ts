import { api } from '@/lib/api';

export interface Products {
	id: string;
	name: string;
	description: string;
	image: string;
	price: number;
}

export async function fetchProducts(): Promise<Products[]> {
	const res = await api.get('/product');
	return res.data;
}
