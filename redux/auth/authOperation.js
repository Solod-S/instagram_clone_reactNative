import { Alert } from "react-native";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { authSlice } from "./authReducer";
const { authStateChange, authSignOut, updateUserInfo } = authSlice.actions;

import handleNewUser from "../../firebase/operations/handleNewUser";

export const authSignUpUser =
  ({ login, email, password, profile_picture }) =>
  async (dispatch) => {
    try {
      const { uid, photoUri } = await handleNewUser(login, email, password);

      dispatch(
        updateUserInfo({
          owner_uid: uid,
          username: login,
          email,
          profile_picture: photoUri,
          subscribe_list: [],
          favorite: [],
          user_about: "",
        })
      );
    } catch (error) {
      console.log("error.message.sign-up:", error.message);

      switch (error.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          Alert.alert("This email already in use");
          break;

        default:
          Alert.alert(error.message);
          break;
      }
    }
  };

export const authSignInUser =
  ({ email, password, navigation }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      const { uid, displayName, photoURL } = auth.currentUser;

      dispatch(
        updateUserInfo({
          owner_uid: uid,
          username: displayName,
          email,
          profile_picture: photoURL,
        })
      );
    } catch (error) {
      Alert.alert("Oops!..", "Error! Email or password doesn't match!", [
        { text: "ok", onPress: () => console.log("Ok"), style: "cancel" },
        { text: "Sign Up", onPress: () => navigation.push("SignupScreen") },
      ]);
      console.log(error.message);
    }
  };

export const authResetPassword =
  (email, navigation) => async (dispatch, getState) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Password reset email sent!");
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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
          username: user.displayName,
          owner_uid: user.uid,
        };

        dispatch(updateUserInfo(userUpdateProfile));
        dispatch(authStateChange({ stateChange: true }));
      }
    } catch (error) {
      console.log("error.message.state-change:", error.message);
    }
  });
};
