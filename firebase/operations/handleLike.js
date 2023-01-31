import { fsbase } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  getFirestore,
} from "firebase/firestore";

const handleLike = async (currenUser, postIdTemp, userIdTemp) => {
  const dbRef = doc(fsbase, `users/${userIdTemp}/posts/${postIdTemp}`);
  const postsDetails = await getDoc(dbRef);
  const currentData = postsDetails.data();
  const alreadyLiked = currentData.liked_users.includes(currenUser);

  if (!alreadyLiked) {
    await updateDoc(dbRef, {
      likes: increment(1),
      liked_users: firebase.firestore.FieldValue.arrayUnion(currenUser),
    });
  } else {
    await updateDoc(dbRef, {
      likes: increment(-1),
      liked_users: firebase.firestore.FieldValue.arrayRemove(currenUser),
    });
  }
  return alreadyLiked;
};

export default handleLike;
