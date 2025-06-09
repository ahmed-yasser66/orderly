import { configureStore } from '@reduxjs/toolkit';
import spaceReducer from './slices/spaceReducer'
import menuReducer from './slices/menuSlice';
import participantsReducer from './slices/participantsReducer';
import orderReducer from './slices/orderReducer';
import adminReducer from './slices/adminReducer';

const store = configureStore({
  reducer: {
    space: spaceReducer,
    menu: menuReducer,
    participants: participantsReducer,
    order: orderReducer,
    admin: adminReducer,
  },
});

export default store;