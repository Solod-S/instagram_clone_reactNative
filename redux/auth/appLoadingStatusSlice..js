import { createSlice } from "@reduxjs/toolkit";

export const appLoadingStatusSlice = createSlice({
  name: "appLoadingStatus",
  initialState: { status: false },
  reducers: {
    turnOn(state, _) {
      state.status = true;
    },
    turnOff(state, _) {
      state.status = false;
    },
  },
});

export const { turnOn, turnOff } = appLoadingStatusSlice.actions;
