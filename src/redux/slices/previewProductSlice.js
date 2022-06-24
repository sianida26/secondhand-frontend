import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "",
    price: "",
    category: "",
    description: "",
    previewURIs: [],
    files: []

}

export const previewProductSlice = createSlice({
    name: 'previewProduct',
    initialState,
    reducers: {
        setPreviewProductData: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        }
    }
});

export const { setPreviewProductData } = previewProductSlice.actions;

export default previewProductSlice.reducer;