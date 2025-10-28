import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface CartItem {
	title: string;
	description: string;
	image: string;
	quantity: number;
}

interface CartState {
	items: CartItem[];
}

const initialState: CartState = {
	items: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
			const existingItem = state.items.find((item) => item.title === action.payload.title);
			if (existingItem) {
				existingItem.quantity += 1;
			} else {
				state.items.push({ ...action.payload, quantity: 1 });
			}
		},
	},
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
