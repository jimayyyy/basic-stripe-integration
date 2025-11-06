import { api } from '@/lib/api';

export async function fetchProducts() {
	const res = await api.get('/product');
	return res.data;
}
