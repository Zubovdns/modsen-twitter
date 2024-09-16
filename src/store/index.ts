import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Используем localStorage

import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './slices';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);
