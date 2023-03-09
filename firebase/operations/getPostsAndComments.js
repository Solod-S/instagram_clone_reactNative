//DON'T USE THIS!!!!!
import { fsbase } from "../firebase/firebase";
import { collection, query, getDocs } from "firebase/firestore";

const getPostsAndComments = async () => {
  const q = query(collection(fsbase, "users"));
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    ...doc.data(),
    userIdTemp: doc.id,
  }));

  const postByOne = await Promise.all(
    users.map(async (elem) => {
      const posts = query(collection(fsbase, `users/${elem.userIdTemp}/posts`));

      const postsDetails = await getDocs(posts);

      const postsInfo = postsDetails.docs.map((doc) => ({
        ...doc.data(),
        postIdTemp: doc.id,
        userIdTemp: elem.userIdTemp,
      }));
      return postsInfo;
    })
  );

  const allPosts = [];

  for (const post of postByOne) {
    allPosts.push(...post);
  }

  const commentsAndPosts = await Promise.all(
    allPosts.map(async (el) => {
      const commetns = query(
        collection(
          fsbase,
          `users/${el.userIdTemp}/posts/${el.postIdTemp}/comments`
        )
      );

      const commetnsDetails = await getDocs(commetns);
      const commetnsInfo = commetnsDetails.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return { ...el, comments: commetnsInfo };
    })
  );

  return commentsAndPosts;
  // setPosts(commentsAndPosts);
};
