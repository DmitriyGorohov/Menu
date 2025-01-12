import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { shopSliceReducer } from './shop/shopSlice.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import {profileReducer} from './profile/profileSlice.ts';
import {menuReducer} from './menu/menuSlice.ts';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['shop', 'profile'],
};

const rootReducer = combineReducers({
    shop: shopSliceReducer,
    profile: profileReducer,
    menu: menuReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
