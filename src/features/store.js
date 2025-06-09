import { configureStore } from '@reduxjs/toolkit';
import spaceReducer from './slices/spaceReducer'
import participantsReducer from './slices/participantsReducer';
import orderReducer from './slices/orderSlice';
import adminReducer from './slices/adminReducer';
import menuReducer from "./slices/menuSlice";

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