// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,  // ✅ valid reducer
  },
});

export const { increment, decrement } = counterSlice.actions;
export default store;
