import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cart';
import sidebarReducer from './sidebar';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { productsApi } from '@/api/productsApi';

const rootReducer = combineReducers({
	cart: cartReducer,
	[productsApi.reducerPath]: productsApi.reducer,
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
		}).concat(productsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
