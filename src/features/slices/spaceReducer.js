import { createSlice } from '@reduxjs/toolkit';
import { serverTimestamp } from 'firebase/firestore';

const initialState = {};

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    createSpace: (state, action) => {
      // const { id, name, description } = action.payload;
      console.log(action.payload);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.adminId = action.payload.adminId;
      state.description = action.payload.description;
      state.isClosed = action.payload.isClosed ?? false;
      state.orders = action.payload.orders ?? null;
      state.createdAt = new Date().toISOString(); // Again, not serverTimestamp()
    },

    closeSpace: (state) => {
      if (state) {
        state.isClosed = true;
      }
    },

    addOrderToSpace: (state, action) => {
      const { itemId, involved } = action.payload;
      if (state) {
        if (!state.orders) state.orders = [];
        state.orders.push({ itemId, involved }); // involved: [{ p_id, quantity }]
      }
    },
  },
});

export const { createSpace, closeSpace, addOrderToSpace } = spaceSlice.actions;
export default spaceSlice.reducer;
