// src/features/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const singlemenu = createSlice({
  name: "singlemenu",
  initialState: { arr: [], total: 0 },
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
  },
});

export const { setMenu, setQuantity } = singlemenu.actions;

export default singlemenu.reducer;
