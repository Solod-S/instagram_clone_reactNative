import { fsbase } from "../firebase";
import { collection, query, getDocs } from "firebase/firestore";

import getAvatar from "./getAvatar";

const getCommentsOnly = async (email, postIdTemp) => {
  const q = query(
    collection(fsbase, `users/${email}/posts/${postIdTemp}/comments`)
  );
  const snapshot = await getDocs(q);
  const newComments = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const result = {
        ...doc.data(),
        commentIdTemp: doc.id,
      };
      return result;
    })
  );
  const sortedComments = newComments.sort((a, b) => b.created < a.created);

  return sortedComments;
};

export default getCommentsOnly;
