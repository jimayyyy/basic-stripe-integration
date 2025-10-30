import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Product {
	productId: string;
	quantity: number;
}

interface OrderPayload {
	products: Product[];
}

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	endpoints: (builder) => ({
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		createOrder: builder.mutation<OrderPayload, any>({
			// premier param retour et second body
			query: (body) => ({
				url: 'orders',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useCreateOrderMutation } = orderApi;
