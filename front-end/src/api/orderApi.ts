import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Product {
	productId: string;
	quantity: number;
}

interface OrderPayload {
	products: Product[];
}

interface OrderResponses {
	createdAt: string;
	id: string;
	items: [];
	status: string;
}

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	endpoints: (builder) => ({
		createOrder: builder.mutation<OrderResponses, OrderPayload>({
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
