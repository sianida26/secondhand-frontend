import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import previewProductReducer from './slices/previewProductSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    previewProduct: previewProductReducer
  },
})