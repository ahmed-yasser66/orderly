import { createSlice } from '@reduxjs/toolkit';

const participantsSlice = createSlice({
  name: 'participants',
  initialState: [],

  reducers: {
    addParticipant: (state, action) => {
      const { id, name, spaceId } = action.payload;
      if (!state.find(p => p.id === id)) {
        state.push({
          id,
          name,
          joinedAt: new Date().toISOString(), // Using new Date() for simplicity
          selectedItems: [], // Array of { itemId, quantity }
          spaceId: spaceId || -1, // Default to null if spaceId is not provided
        });
      }
    },

    selectItem: (state, action) => {
      const { participantId, menuItem, quantity } = action.payload;
      const participant = state.find(p => p.id === participantId);
      if (participant) {
        const existing = participant.selectedItems.find(i => i.itemId === menuItem.id);
        if (existing) {
          existing.quantity += quantity;
        } else {
          participant.selectedItems.push({
            itemId: menuItem.id,
            quantity,
          });
        }
      }
    },

    setItemQuantity: (state, action) => {
      const { participantId, itemId, quantity } = action.payload;
      const participant = state.find(p => p.id === participantId);
      if (participant) {
        const item = participant.selectedItems.find(i => i.itemId === itemId);
        if (item) {
          item.quantity = quantity;
        }
      }
    },


  },

});

export const { addParticipant, selectItem, setItemQuantity } = participantsSlice.actions;
export default participantsSlice.reducer;
