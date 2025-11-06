import axios from 'axios';

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000',
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.response.use(
	(res) => res,
	(error) => {
		console.error('API Error:', error.response?.data || error.message);
		return Promise.reject(error);
	},
);
