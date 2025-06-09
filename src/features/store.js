import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "./slices/tempReducer";
import menuReducer from "./slices/menuSlice";
import orderReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    temp: tempReducer,
    menu: menuReducer,
    order: orderReducer,
  },
});

export default store;
