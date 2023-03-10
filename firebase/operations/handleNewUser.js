import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../../firebase/firebase";
import { fsbase } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

import getAvatar from "./getAvatar";

const handleNewUser = async (login, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  const photoUri = await getAvatar("default");
  await updateProfile(auth.currentUser, {
    displayName: login,
    photoURL: photoUri,
  });

  const { uid, displayName, photoURL } = auth.currentUser;

  await setDoc(doc(fsbase, "users", email), {
    owner_uid: uid,
    login: login,
    email: email,
    profile_picture: photoUri,
    subscribe_list: [],
    favorite: [],
    subscription: "starter",
    user_about: "",
  });

  return { uid, photoUri };
};

export default handleNewUser;
