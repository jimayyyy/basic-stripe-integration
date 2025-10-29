import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface ProductItem {
	name: string;
	description: string;
	image?: string;
}

interface ProductsState {
	products: ProductItem[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductsState = {
	products: [],
	loading: false,
	error: null,
};

export const fetchProducts = createAsyncThunk<ProductItem[]>('products/fetchProducts', async () => {
	const res = await fetch('http://localhost:3000/product');
	const data = await res.json();

	return data.map((p: ProductItem) => ({
		name: p.name,
		description: p.description ?? '',
		image:
			'https://lh3.googleusercontent.com/proxy/rnI3_En64EP7f3eLxeUK59zazrOt3DPuEhk8NOfOY_jdK7VbA7ucKFfwPTqdi_wFZCDyEWJ7hDnZq6D-94CPn7Qlp3A8tmPuWmJZf4aO3kbPtBnKfwVtZw', // Ajoute l'URL image si dispo dans l'API
	}));
});

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// fetch product builder
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductItem[]>) => {
				state.products = action.payload;
				state.loading = false;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Erreur de chargement';
			});
	},
});

export default productsSlice.reducer;
export const selectProducts = (state: RootState) => state.products.products;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
