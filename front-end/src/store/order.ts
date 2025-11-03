import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface OrderState {
	orderId: string;
}

const initialState: OrderState = {
	orderId: '',
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrderId: (state, action: PayloadAction<string>) => {
			state.orderId = action.payload;
		},
	},
});

export const { setOrderId } = orderSlice.actions;
export default orderSlice.reducer;

export const selectOrderId = (state: RootState) => state.order.orderId;
