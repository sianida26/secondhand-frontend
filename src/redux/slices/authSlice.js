import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: "",
    name: "",
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const { setToken, setName } = authSlice.actions;

export default authSlice.reducer;