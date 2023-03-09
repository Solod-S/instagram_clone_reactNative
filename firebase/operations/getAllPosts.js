import { fsbase } from "../firebase";
import { collectionGroup, query, getDocs } from "firebase/firestore";

import getAvatar from "./getAvatar";

const getAllPosts = async () => {
  const def_avatar = await getAvatar("default");

  const q = query(collectionGroup(fsbase, "posts"));
  const snapshot = await getDocs(q);
  const posts = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const email = doc.data().email;
      const photoUri = await getAvatar("user", email);
      return {
        ...doc.data(),
        postIdTemp: doc.id,
        profile_picture: photoUri ? photoUri : def_avatar,
      };
    })
  );

  return posts;
};

export default getAllPosts;
