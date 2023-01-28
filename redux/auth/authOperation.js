import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { fsbase } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

const getRandomProfilePicture = async () => {
  const response = await fetch(
    "https://randomuser.me/api/0.4/?lego&randomapi&results=1"
  );
  const data = await response.json();
  console.log(data.results[0].user.picture);
  return data.results[0].user.picture;
};

export const authSignUpUser =
  ({ login, email, password, profile_picture }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const randomPhoto = await getRandomProfilePicture();
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: randomPhoto,
      });
      console.log(login, email, password);
      const { uid, displayName, photoURL } = auth.currentUser;

      await addDoc(collection(fsbase, "users"), {
        owner_uid: uid,
        login: login,
        email: email,
        profile_picture: randomPhoto,
      });

      dispatch(
        updateUserProfile({
          owner_uid: uid,
          login: randomPhoto,
          email,
          profile_picture: randomPhoto,
        })
      );
    } catch (error) {
      console.log("error.message.sign-up:", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, photoURL } = auth.currentUser;
      dispatch(
        updateUserProfile({
          owner_uid: uid,
          login: displayName,
          email,
          profile_picture: photoURL,
        })
      );
    } catch (error) {
      Alert.alert("Error! Email or password doesn't match!");
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error.message.sign-out:", error.message);
  }
};

export const authStateChangeUsers = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    try {
      if (user) {
        const userUpdateProfile = {
          email: user.email,
          profile_picture: user.photoURL,
          login: user.displayName,
          userId: user.uid,
        };

        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange({ stateChange: true }));
      }
    } catch (error) {
      console.log("error.message.state-change:", error.message);
    }
  });
};
