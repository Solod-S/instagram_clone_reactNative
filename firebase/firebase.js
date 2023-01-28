// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/storage";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLXnU-SAm-yU7X5yxCU2CI6YgI_HLphyU",
  authDomain: "instagram-clone-b03b9.firebaseapp.com",
  projectId: "instagram-clone-b03b9",
  storageBucket: "instagram-clone-b03b9.appspot.com",
  messagingSenderId: "394156483799",
  appId: "1:394156483799:web:ae87249651dd54ddfafc92",
  measurementId: "G-3LW9ES4TSX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const fsbase = getFirestore(app);
