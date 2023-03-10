import { createSlice } from "@reduxjs/toolkit";

const authState = {
  owner_uid: null,
  username: null,
  email: null,
  stateChange: false,
  profile_picture: null,
  user_about: null,
  subscribe_list: [],
  favorite: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    updateUserInfo: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    authSignOut: () => authState,
  },
});
