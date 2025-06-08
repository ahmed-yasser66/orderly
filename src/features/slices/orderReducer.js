import { createSlice } from '@reduxjs/toolkit';
import { serverTimestamp } from 'firebase/firestore';

// Factory function for creating a new order object
const createOrder = () => ({
  spaceId: -1, // Default to -1 if no space is selected
  selectedItems: [],  // [{ itemId, quantity }]
  isFavourite: false,
  createdAt: serverTimestamp(), // only used when saving to Firestore
});

const orderSlice = createSlice({
  name: 'order',
  initialState: createOrder(),

  reducers: {
    resetOrder: () => createOrder(),

    updateOrder: (state, action) => {
      const { participants, spaceId } = action.payload;
      state.spaceId = spaceId || -1; // Set spaceId, default to -1 if not provided
      for (const p of participants) {
        for (const item of p.selectedItems) {
          const existing = state.selectedItems.find(i => i.itemId === item.itemId);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            state.selectedItems.push({
              itemId: item.itemId,
              quantity: item.quantity,
            });
          }
        }
      }
    },

    toggleFavourite: (state) => {
      state.isFavourite = !state.isFavourite;
    },
  },
});

export const { resetOrder, updateOrder, toggleFavourite } = orderSlice.actions;
export default orderSlice.reducer;
