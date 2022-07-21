import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import configs from '../../utils/configs';

const initialState = {
    items: [],
}

export const wishlistSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.items = [...state.items, action.payload]
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
        },
        clearData: (state, action) => {
            return initialState;
        }
    }
});

export const { addItem, removeItem, clearData } = wishlistSlice.actions;

export default wishlistSlice.reducer;