import { configureStore } from "@reduxjs/toolkit";
import tempReducer from "./slices/tempReducer"
const store = configureStore({
  reducer: tempReducer
});

export default store;
