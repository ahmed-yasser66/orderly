import { configureStore } from "@reduxjs/toolkit";
import spaceReducer from "./slices/spaceReducer";
import participantsReducer from "./slices/participantsReducer";
import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminReducer";
import menuReducer from "./slices/menuSlice";
import singlemenuReducer from "./slices/singlemenu";

const store = configureStore({
  reducer: {
    space: spaceReducer,
    menu: menuReducer,
    participants: participantsReducer,
    order: orderReducer,
    admin: adminReducer,
    single: singlemenuReducer,
  },
});

export default store;
