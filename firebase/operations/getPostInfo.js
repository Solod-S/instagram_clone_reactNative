import { fsbase } from "../firebase";
import "firebase/compat/firestore";
import { doc, getDoc } from "firebase/firestore";

const getPostInfo = async (email, id) => {
  const dbRef = doc(fsbase, `users/${email}/posts/${id}`);
  const userDetails = await getDoc(dbRef);
  const currentData = userDetails.data();
  return currentData;
};

export default getPostInfo;
