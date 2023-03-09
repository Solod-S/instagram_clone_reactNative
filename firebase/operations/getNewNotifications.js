import { fsbase } from "../firebase";
import "firebase/compat/firestore";
import { getDocs, query, collection, where } from "firebase/firestore";

import getAvatar from "./getAvatar";
import getUserInfo from "./getUserInfo";
import getPostInfo from "./getPostInfo";

const getNewNotifications = async (email) => {
  const def_avatar = await getAvatar("default");

  const q = query(
    collection(fsbase, `users/${email}/journal/`),
    where("watched", "==", false)
  );

  const notificationSnapshot = await getDocs(q);

  const notification = await Promise.all(
    notificationSnapshot.docs.map(async (item) => {
      const userEmail = await item.data().userEmail;
      const postId = item.data().postId;

      const photoUri = await getAvatar("user", userEmail);
      const userData = await getUserInfo(userEmail);
      let postData = null;

      if (postId) {
        const post = await getPostInfo(email, postId);
        postData = { ...post, postIdTemp: postId };
      }

      return {
        ...item.data(),
        profile_picture: photoUri ? photoUri : def_avatar,
        login: userData.login,
        post: postData,
      };
    })
  );

  return notification.sort((a, b) => a.created < b.created);
};

export default getNewNotifications;
