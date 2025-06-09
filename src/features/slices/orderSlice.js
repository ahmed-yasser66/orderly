// src/features/slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    finalizedOrder: null, // Stores the completed order details
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setFinalizedOrder: (state, action) => {
      state.finalizedOrder = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    clearFinalizedOrder: (state) => {
      state.finalizedOrder = null;
      state.status = 'idle';
      state.error = null;
    },
    setOrderLoading: (state) => {
      state.status = 'loading';
    },
    setOrderError: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setFinalizedOrder, clearFinalizedOrder, setOrderLoading, setOrderError } = orderSlice.actions;

export default orderSlice.reducer;