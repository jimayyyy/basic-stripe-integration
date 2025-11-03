import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart';
import sidebarReducer from './sidebar';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productsApi } from '@/api/productsApi';
import { orderApi } from '@/api/orderApi';
import { paymentApi } from '@/api/paymentApi';

const rootReducer = combineReducers({
	cart: cartReducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[orderApi.reducerPath]: orderApi.reducer,
	[paymentApi.reducerPath]: paymentApi.reducer,
	sidebar: sidebarReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(productsApi.middleware, orderApi.middleware, paymentApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
