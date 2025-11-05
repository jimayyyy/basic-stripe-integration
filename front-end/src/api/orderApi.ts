import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export enum OrderStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
}

interface Product {
	id: string;
	quantity: number;
}

interface CreateOrEditOrderPayload {
	products: Product[];
}

export interface OrderItem {
	id: string;
	orderId: string;
	productId: string;
	quantity: number;
	total: number;
}

interface OrderResponses {
	createdAt: string;
	id: string;
	items: OrderItem[];
	status: OrderStatus;
}

export const orderApi = createApi({
	reducerPath: 'orderApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	endpoints: (builder) => ({
		// fetch order by id
		getOrder: builder.query<OrderResponses, string>({
			query: (id) => `orders/${id}`,
		}),

		// create a new order
		createOrder: builder.mutation<OrderResponses, CreateOrEditOrderPayload>({
			query: (body) => ({
				url: 'orders',
				method: 'POST',
				body,
			}),
		}),

		// edit existing order
		editOrder: builder.mutation<OrderResponses, { id: string; body: CreateOrEditOrderPayload }>({
			query: ({ id, body }) => ({
				url: `orders/${id}`,
				method: 'PUT',
				body,
			}),
		}),
	}),
});

export const { useGetOrderQuery, useCreateOrderMutation, useEditOrderMutation } = orderApi;
