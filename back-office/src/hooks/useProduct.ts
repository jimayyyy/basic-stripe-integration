'use client';
import { useQuery } from '@tanstack/react-query';
import * as productsApi from '@/lib/api/product';

export function useProducts() {
	return useQuery({
		queryKey: ['product'],
		queryFn: () => productsApi.fetchProducts(),
	});
}
