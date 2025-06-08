import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: [],
  reducers: {
    addMenuItem: (state, action) => {
      const { id, name, price, spaceId } = action.payload;
      if (!state.find(item => item.id === id)) {
        state.push({
          id,
          name,
          price,
          participants: [],
          spaceId: spaceId || -1, // Default to -1 if spaceId is not provided
        });
      }
    },

    updateMenuItemParticipants: (state, action) => {
      const { itemId, participantId } = action.payload;
      const item = state.find(i => i.id === itemId);
      if (item && !item.participants.includes(participantId)) {
        item.participants.push(participantId);
      }
    },

    updateMenuItem: (state, action) => {
      const { id, name, price } = action.payload;
      const item = state.find(i => i.id === id);
      if (item) {
        item.name = name ?? item.name;
        item.price = price ?? item.price;
      }
    },
  },
});

export const { addMenuItem, updateMenuItemParticipants, updateMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
