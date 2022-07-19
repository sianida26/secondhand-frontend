import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
import configs from '../../utils/configs';

const initialState = {
    items: [],
    isLoading: false,
}

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (state, action) => {
            state.items = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setData: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        clearData: (state, action) => {
            return initialState;
        }
    }
});

export const { setNotifications, setLoading, setData, clearData } = notificationSlice.actions;

export default notificationSlice.reducer;