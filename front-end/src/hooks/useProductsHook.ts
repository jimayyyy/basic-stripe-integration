import { fetchProducts, selectProducts, selectProductsError, selectProductsLoading } from '@/store/products';
import type { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useProductsHook = () => {
	const dispatch = useDispatch<AppDispatch>();
	const products = useSelector(selectProducts);
	const loading = useSelector(selectProductsLoading);
	const error = useSelector(selectProductsError);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	return {
		products,
		loading,
		error,
	};
};
