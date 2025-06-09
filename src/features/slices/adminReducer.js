import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { api } from '../../Firebase/api_util';

const initialState = {
  id: 0,
  currentSpace: -1, // Current space the admin is managing
  currentOrder: -1, // Current order being processed
  spaces: [],
  orders: [],
  status: 'idle', // for loading state
  error: null,
};
export const fetchAdminData = createAsyncThunk(
  'admin/fetchAdminData',
  async (adminId, thunkAPI) => {
    try {
      const spaces = await api.order.getSpacesByAdmin(adminId);
      const ordersData = await api.order.getFavouritesOrders(adminId);
      return { adminId, spaces, ordersData };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.id = action.payload.id;
    },
    addSpaceToAdmin: (state, action) => {
      state.spaces.push(action.payload.spaceId);
    },
    addOrderToAdmin: (state, action) => {
      state.orders.push(action.payload.order);
    },
    setCurrentSpace: (state, action) => {
      state.currentSpace = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.id = action.payload.adminId;
        state.spaces = action.payload.spaces;
        state.orders = action.payload.ordersData.flatMap(o => o.orders || []);
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions matching the reducer names exactly:
export const { setAdmin, addSpaceToAdmin, addOrderToAdmin, setCurrentOrder, setCurrentSpace } = adminSlice.actions;

export default adminSlice.reducer;
