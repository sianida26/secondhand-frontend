import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    isLoading: false,
    requestUpdateNotification: true,
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
        requestUpdateNotification: (state, action) => {
            state.requestUpdateNotification = true
        },
        clearData: (state, action) => {
            return initialState;
        }
    }
});

export const { setNotifications, setLoading, setData, clearData, requestUpdateNotification } = notificationSlice.actions;

export default notificationSlice.reducer;