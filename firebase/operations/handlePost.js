import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { collection, addDoc } from "firebase/firestore";
import { fsbase } from "../../firebase/firebase";

import handleMedia from "./handleMedia";

const handlePost = async (caption, postImage, email, username, owner_uid) => {
  const postPhoto = await handleMedia(postImage, "photos");
  const uniquePostId = uuidv4();
  const date = new Date().toLocaleDateString();
  const time = new Date()
    .toLocaleTimeString()
    .split(":")
    .splice(0, 2)
    .join(":");
  const created = Date.now().toString();

  await addDoc(collection(fsbase, `users/${email}/posts/`), {
    caption,
    created,
    date,
    time,
    likes: 0,
    liked_users: [],
    postImage: postPhoto,
    user: username,
    email,
    owner_uid,
    postId: uniquePostId,
  });
};

export default handlePost;
