import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface ProductItem {
	name: string;
	description: string;
	price: number;
	image: string;
}

type ProductsResponse = Record<string, Omit<ProductItem, 'name'>>;

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	endpoints: (builder) => ({
		// fetch products
		fetchProducts: builder.query<ProductsResponse, void>({
			query: () => 'product',
			transformResponse: (data: ProductItem[]): ProductsResponse => {
				return data.reduce((acc, current) => {
					acc[current.name] = {
						description: current.description ?? '',
						image: current.image ?? 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg',
						price: current.price,
					};
					return acc;
				}, {} as ProductsResponse);
			},
		}),
	}),
});

export const { useFetchProductsQuery } = productsApi;
