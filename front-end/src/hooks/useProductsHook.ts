import { fetchProducts, selectProducts } from '@/store/products';
import type { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useProductsHook = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { products, loading, error } = useSelector(selectProducts);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return {
		products,
		loading,
		error,
	};
};
