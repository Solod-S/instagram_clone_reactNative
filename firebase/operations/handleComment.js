import { fsbase } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import handleNotification from "./handleNotification";

const handleComment = async (
  userId,
  postId,
  comment,
  owner_uid,
  profile_picture,
  username,
  email
) => {
  const date = new Date().toLocaleDateString();
  const time = new Date()
    .toLocaleTimeString()
    .split(":")
    .splice(0, 2)
    .join(":");
  const created = Date.now().toString();
  const commentId = uuidv4();
  const newComment = {
    comment,
    commentId,
    created,
    time,
    date,
    owner_uid,
    profile_picture,
    user: username,
    email,
  };
  await addDoc(
    collection(fsbase, `users/${userId}/posts/${postId}/comments/`),
    newComment
  );
  handleNotification(
    userId,
    {
      userEmail: email,
      postId: postId,
    },
    "commentAction"
  );
  return newComment;
};

export default handleComment;
