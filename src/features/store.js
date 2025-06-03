import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "./slices/tempReducer";
import menuReducer from "./slices/menuSlice";

const store = configureStore({
  reducer: {
    temp: tempReducer,
    menu: menuReducer,
  },
});

export default store;
