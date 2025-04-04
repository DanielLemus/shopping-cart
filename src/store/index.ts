// store/index.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { PersistConfig, persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/es/storage';

import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<TRootState> = {
  key: 'root',
  storage,
  whitelist: ['cart'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducers = persistReducer<TRootState>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

export const useAppDispatch: () => TAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export type TAppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
