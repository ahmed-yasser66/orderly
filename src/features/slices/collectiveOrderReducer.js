// src/features/slices/collectiveOrdersSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const collectiveOrdersSlice = createSlice({
  name: "collectiveOrders",
  initialState: {
    orders: [],  // Each order = { id (userId), name, selectedItems: [{id, qty}], submittedAt }
    summary: {}, // { itemId: totalQuantity }
    grandTotal: 0
  },
  reducers: {
    setCollectiveOrders: (state, action) => {
      state.orders = action.payload;

      // Compute summary
      const summary = {};
      action.payload.forEach(order => {
        order.selectedItems.forEach(item => {
          if (!summary[item.id]) {
            summary[item.id] = 0;
          }
          summary[item.id] += item.qty;
          state.grandTotal += item.qty * item.price; // Assuming each item has a price property

        });
      });
      state.summary = summary;
    },
    clearCollectiveOrders: (state) => {
      state.orders = [];
      state.summary = {};
    },
  },
});

export const { setCollectiveOrders, clearCollectiveOrders } = collectiveOrdersSlice.actions;
export default collectiveOrdersSlice.reducer;
