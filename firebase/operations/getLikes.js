import { fsbase } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const getLikes = async (email, postIdTemp) => {
  const dbRef = doc(fsbase, `users/${email}/posts/${postIdTemp}/`);
  const userDetails = await getDoc(dbRef);
  const currentData = userDetails.data();
  const lastFetchedLikes = currentData.liked_users;

  return lastFetchedLikes;
};

export default getLikes;
