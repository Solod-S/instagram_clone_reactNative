import { fsbase } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

import handleAvatar from "./handleAvatar";

const updateProfilePhoto = async (photoUri) => {
  const auth = getAuth();
  await updateProfile(auth.currentUser, {
    photoURL: photoUri,
  });
};

const patchUserInfo = async (
  postImage,
  email,
  description,
  profile_picture
) => {
  const avatarUri = await handleAvatar(postImage, "avatarsImage", email);
  const dbRef = doc(fsbase, `users/${email}`);

  await updateDoc(dbRef, {
    user_about: description ? description.trim() : "",
    profile_picture: avatarUri ? avatarUri : profile_picture,
  });
  await updateProfilePhoto(avatarUri ? avatarUri : profile_picture);
  return avatarUri;
};

export default patchUserInfo;
