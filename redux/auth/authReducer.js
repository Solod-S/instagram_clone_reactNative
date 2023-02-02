import { createSlice } from "@reduxjs/toolkit";

const authState = {
  owner_uid: null,
  username: null,
  email: null,
  stateChange: false,
  profile_picture: null,
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
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => authState,
  },
});
