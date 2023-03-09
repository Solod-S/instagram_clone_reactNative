import { fsbase } from "../firebase";
import { collectionGroup, query, getDocs } from "firebase/firestore";

import getAvatar from "../../firebase/operations/getAvatar";

const getSearchPosts = async (searchQuery) => {
  const def_avatar = await getAvatar("default");
  const q = query(collectionGroup(fsbase, "posts"));
  const snapshot = await getDocs(q);
  const posts = snapshot.docs.map((doc) => ({
    ...doc.data(),
    postIdTemp: doc.id,
  }));
  const filteredPost = posts.filter(
    (doc) =>
      doc.caption
        .toLowerCase()
        .split(" ")
        .includes(searchQuery.toLowerCase()) ||
      doc.user.toLowerCase() === searchQuery.toLowerCase()
  );

  const result = await Promise.all(
    filteredPost.map(async (item) => {
      const photoUri = await getAvatar("user", item.email);

      return {
        ...item,
        profile_picture: photoUri ? photoUri : def_avatar,
      };
    })
  );

  return result.sort((a, b) => a.created < b.created);
};

export default getSearchPosts;
