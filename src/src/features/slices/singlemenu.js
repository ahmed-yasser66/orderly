// src/features/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const singlemenu = createSlice({
  name: "singlemenu",
  initialState: { arr: [], total: 0, userId: -1 },
  reducers: {
    setQuantity: (state, payload) => {
      const { ind, quantity } = payload.payload;

      const item = state.arr.find((item, i) => i === ind);
      if (item) {
        state.total += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
      }
    },
    setMenu: (state, payload) => {
      const { name, price } = payload.payload;
      state["arr"].push({ name, price, quantity: 0 });
    },
    setUserId: (state, payload) => {
      state.userId = payload.payload;
    },
  },
});

export const { setMenu, setQuantity, setUserId } = singlemenu.actions;

export default singlemenu.reducer;
