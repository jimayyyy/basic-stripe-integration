import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface CreatePaymentIntentResponse {
	clientSecret: string;
}

interface CreatePaymentIntentPayload {
	orderId: string;
}

export const paymentApi = createApi({
	reducerPath: 'paymentApi',
	baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
	endpoints: (builder) => ({
		// stripe payment intent creation
		createPaymentIntent: builder.mutation<CreatePaymentIntentResponse, CreatePaymentIntentPayload>({
			query: (body) => ({
				url: 'payment/create-intent',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
