import { createSlice } from "@reduxjs/toolkit";

const tempSlice = createSlice({
  name:"temp reducer",
  initialState:{
    list :[]
  },
})

export default tempSlice.reducer