import { RootState } from '../store.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuState {
    isOnboarding: boolean;
    isApi: boolean;
    policy: string;
}

const initialState: MenuState = {
    isOnboarding: false,
    isApi: false,
    policy: '',
};

export const menuSelector = (state: RootState): MenuState => state.menu;

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setIsOnboarding: (state, action) => {
            state.isOnboarding = action.payload;
        },
        setPolicyPath: (state, { payload }: PayloadAction<string>) => {
            state.policy = payload;
        },
        setIsApi: (state, { payload }: PayloadAction<boolean>) => {
            state.isApi = payload;
        },
    },
});

export const { setPolicyPath, setIsApi, setIsOnboarding } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
