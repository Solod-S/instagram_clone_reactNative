import { fsbase } from "../firebase";
import {
  collectionGroup,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";

import getAvatar from "./getAvatar";

// const getAllPostsByEmail = async (email) => {
//   const def_avatar = await getAvatar("default");
//   const photoUri = await getAvatar("user", email);

//   const q = query(
//     collectionGroup(fsbase, "posts"),
//     where("email", "==", email)
//   );
//   const snapshot = await getDocs(q);
//   const posts = snapshot.docs.map((doc) => ({
//     ...doc.data(),
//     postIdTemp: doc.id,
//     profile_picture: photoUri ? photoUri : def_avatar,
//   }));

//   return posts;
// };

const getPostsByEmail = async (email) => {
  const def_avatar = await getAvatar("default");
  const photoUri = await getAvatar("user", email);
  const q = query(collection(fsbase, `users/${email}/posts`));

  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map((doc) => ({
    ...doc.data(),
    postIdTemp: doc.id,
    profile_picture: photoUri ? photoUri : def_avatar,
  }));

  return posts;
};

export default getPostsByEmail;
