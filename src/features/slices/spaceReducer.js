import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../Firebase/api_util';

export const fetchAdminSpaces = createAsyncThunk(
  'space/fetchAdminSpaces',
  async (adminId, thunkAPI) => {
    try {
      const spaces = await api.order.getSpacesByAdmin(adminId);
      return { adminId, spaces };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  spaces: [],    // array of spaces
  status: 'idle',
  error: null,
  id: null       // adminId or other meta info if needed
};

export const createNewSpace = createAsyncThunk(
  'space/createNewSpace',
  async (newSpace, thunkAPI) => {
    try {
      const space = await api.space.createSpace(newSpace);
      return space; // Assuming createSpace returns the new space object or ID
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    closeSpace: (state, action) => {
      const space = state.spaces.find(s => s.id === action.payload);
      if (space) {
        space.isClosed = true;
      }
    },
    setSpaces: (state, action) => {
      state.spaces = action.payload; // Replace the spaces array
    },
    addOrderToSpace: (state, action) => {
      const { spaceId, itemId, involved } = action.payload;
      const space = state.spaces.find(s => s.id === spaceId);
      if (space) {
        if (!space.orders) space.orders = [];
        space.orders.push({ itemId, involved });
      }
    },
    updateSpace: (state, action) => {
      const { id, ...updates } = action.payload;
      const space = state.spaces.find(s => s.id === id);
      if (space) {
        Object.assign(space, updates);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewSpace.pending, (state) => {
        console.log('Creating new space...');
      })
      .addCase(createNewSpace.fulfilled, (state, action) => {
        const newSpace = {
          ...action.payload,
        };
        state.spaces.push(newSpace);
      })
      .addCase(createNewSpace.rejected, (state, action) => {
        console.error('Failed to create space:', action.payload);
      })

      .addCase(fetchAdminSpaces.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminSpaces.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.id = action.payload.adminId;
        state.spaces = action.payload.spaces; // assign new spaces array
      })
      .addCase(fetchAdminSpaces.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { updateSpace, closeSpace, addOrderToSpace, setSpaces } = spaceSlice.actions;
export default spaceSlice.reducer;
