import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface ProductItem {
	name: string;
	description: string;
	price: number;
	image: string;
}

interface ProductsState {
	products: Record<string, Omit<ProductItem, 'name'>>;
	loading: boolean;
	error: string | null;
}

const initialState: ProductsState = {
	products: {},
	loading: false,
	error: null,
};

export const fetchProducts = createAsyncThunk<Record<string, Omit<ProductItem, 'name'>>>(
	'products/fetchProducts',
	async () => {
		const res = await fetch('http://localhost:3000/product');
		const data = await res.json();

		return data.reduce((acc: Record<string, Omit<ProductItem, 'name'>>, current: ProductItem) => {
			acc[current.name] = {
				description: current.description ?? '',
				image: current.image ?? 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
				price: current.price,
			};
			return acc;
		}, {});
	},
);

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
			.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Record<string, Omit<ProductItem, 'name'>>>) => {
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
export const selectProducts = (state: RootState) => state.products;
