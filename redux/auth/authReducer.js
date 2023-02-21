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
    updateUserProfile: (state, { payload }) => ({
      ...state,
      owner_uid: payload.owner_uid,
      username: payload.login,
      email: payload.email,
      profile_picture: payload.profile_picture,
      subscribe_list: [],
      favorite: [],
    }),
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
