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
		// Even if we can reduce the code using a delta as params (-1 or 1) I prefer this way to have a better code comprehension
		reduceItem: (state, action: PayloadAction<Pick<CartItem, 'title'>>) => {
			const existingItem = state.items.find((item) => item.title === action.payload.title);
			if (existingItem && existingItem.quantity - 1 > 0) {
				existingItem.quantity -= 1;
			}
		},
		addItem: (state, action: PayloadAction<Pick<CartItem, 'title'>>) => {
			const existingItem = state.items.find((item) => item.title === action.payload.title);
			if (existingItem) {
				existingItem.quantity += 1;
			}
		},
		removeItem: (state, action: PayloadAction<Pick<CartItem, 'title'>>) => {
			state.items = state.items.filter((item) => item.title !== action.payload.title);
		},
	},
});

export const { addToCart, reduceItem, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCart = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
