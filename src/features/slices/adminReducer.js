import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../Firebase/api_util';

const initialState = {
  id: 0,
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
        state.spaces = action.payload.spaces.map(s => s.id);
        state.orders = action.payload.ordersData.flatMap(o => o.orders || []);
      })
      .addCase(fetchAdminData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export actions matching the reducer names exactly:
export const { setAdmin, addSpaceToAdmin, addOrderToAdmin } = adminSlice.actions;

export default adminSlice.reducer;
