import { fsbase } from "../firebase";
import { collectionGroup, query, getDocs, where } from "firebase/firestore";

import getAvatar from "./getAvatar";

const getFavoritePost = async (id) => {
  const def_avatar = await getAvatar("default");
  const postsCollection = collectionGroup(fsbase, "posts");
  const q = query(postsCollection, where("postId", "==", id));

  const snapshot = await getDocs(q);
  const posts = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const userData = doc.data();
      const photoUri = await getAvatar("user", userData.email);

      return {
        ...doc.data(),
        postIdTemp: doc.id,
        profile_picture: photoUri ? photoUri : def_avatar,
      };
    })
  );

  return posts[0];
};

export default getFavoritePost;
