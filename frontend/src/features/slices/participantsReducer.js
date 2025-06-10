import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../Firebase/api_util';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase/config';


export const fetchParticipants = createAsyncThunk(
  "particpant/fetchAllParticpants",
  async (spaceId, thunkAPI) => {
    try {
      const participants = await api.space.getParticipants(spaceId);
      return participants; // Assuming createSpace returns the new space object or ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const listenToParticipants = (spaceId) => (dispatch) => {
  const ref = collection(db, "spaces", spaceId, "participants");

  const unsubscribe = onSnapshot(ref, (snapshot) => {
    const participants = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    dispatch(setParticipants(participants));
  });

  return unsubscribe;
};


export const addNewParticipant = createAsyncThunk(
  'particpant/addNewParticipant',
  async (newParticipant, thunkAPI) => {
    try {
      const result = await api.space.addParticipant(newParticipant.spaceId, newParticipant.name);
      return result; // Assuming createSpace returns the new space object or ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const saveParticipantOrder = createAsyncThunk(
  "singlemenu/saveParticipantOrder",
  async ({ spaceId, participantId, selectedItems }, thunkAPI) => {
    try {
      await api.participant.pushParticipantOrder(spaceId, participantId, selectedItems);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const participantsSlice = createSlice({
  name: 'participants',
  initialState: [],

  reducers: {
    setParticipants: (state, action) => {
      return action.payload; // Replace the state with fetched participants
    },
    updateParticipantOrderFromMenu: (state, action) => {
      const { participantId, menuItems } = action.payload;
      const participant = state.find(p => p.id === participantId);
      if (participant) {
        participant.selectedItems = menuItems.map(item => ({
          itemId: item.name,  // use proper ID if available
          quantity: item.quantity,
          price: item.price,
        }));
      }
    },

    addParticipant: (state, action) => {
      const { id, name } = action.payload;
      if (!state.find(p => p.id === id)) {
        state.push({
          id,
          name,
          joinedAt: new Date().toISOString(), // Using new Date() for simplicity
          selectedItems: [], // Array of { itemId, quantity }
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
  extraReducers: (builder) => {
    builder
      .addCase(addNewParticipant.pending, (state) => {
        // Optionally handle loading state
        console.log('Adding new participant...');
      })
      .addCase(addNewParticipant.fulfilled, (state, action) => {
        console.log(action.payload);
        if (!state.find(p => p.id === action.payload.id)) {
          state.push({
            ...action.payload,
            selectedItems: [], // Array of { itemId, quantity }
          });
        }
      }).addCase(addNewParticipant.rejected, (state, action) => {
        console.error("Failed to add participant:", action.payload);
      })


      .addCase(fetchParticipants.pending, (state) => {
        // Optionally handle loading state
        console.log("Fetching participants...");
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        console.log("Participants fetched successfully:", action.payload);
        return action.payload; // Replace the state with fetched participants
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        console.error("Failed to fetch participants:", action.payload);
      })

      .addCase(saveParticipantOrder.pending, (state) => {
        // Optionally handle loading state
        console.log("Saving participant order...");
      })
      .addCase(saveParticipantOrder.fulfilled, (state, action) => {
        // Handle successful order save if needed
        console.log("Participant order saved successfully");
      })
      .addCase(saveParticipantOrder.rejected, (state, action) => {
        console.error("Failed to save participant order:", action.payload);
      });
  },

});

export const { addParticipant, selectItem, setItemQuantity, setParticipants, updateParticipantOrderFromMenu } = participantsSlice.actions;
export default participantsSlice.reducer;
