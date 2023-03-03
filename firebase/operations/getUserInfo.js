import { fsbase } from "../firebase";
import "firebase/compat/firestore";
import { doc, getDoc } from "firebase/firestore";

const getUserInfo = async (email) => {
  const dbRef = doc(fsbase, `users/${email}`);
  const userDetails = await getDoc(dbRef);
  const currentData = userDetails.data();
  return currentData;
};

export default getUserInfo;
