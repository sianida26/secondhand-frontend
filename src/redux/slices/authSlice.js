import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: "",
    name: "",
    profilePhoto: "",
    city: "",
    address: "",
    phone: "",
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
        },
        setProfilePhoto: (state, action) => {
            state.profilePhoto = action.payload;
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

export const { setToken, setName, setProfilePhoto, setData, clearData } = authSlice.actions;

export default authSlice.reducer;