import { fsbase } from "../firebase";
import { collection, query, getDocs, where } from "firebase/firestore";

const getSubscription = async (subscribe_list) => {
  const q = query(
    collection(fsbase, "users"),
    where("email", "in", subscribe_list)
    // where("arr", "array-contains-any", "id")
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return users;
};

export default getSubscription;
