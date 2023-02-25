import { fsbase } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const handleSubscribe = async (email, currenUser) => {
  const dbRef = doc(fsbase, `users/${email}`);
  const userDetails = await getDoc(dbRef);
  const currentData = userDetails.data();
  const alreadySubscribed = currentData.subscribe_list.includes(currenUser);

  if (!alreadySubscribed) {
    await updateDoc(dbRef, {
      // likes: increment(1),
      subscribe_list: firebase.firestore.FieldValue.arrayUnion(currenUser),
    });

    const result = [...currentData.subscribe_list, currenUser];

    return result;
  } else {
    await updateDoc(dbRef, {
      // likes: increment(-1),
      subscribe_list: firebase.firestore.FieldValue.arrayRemove(currenUser),
    });
    const result = currentData.subscribe_list.filter(
      (user) => user !== currenUser
    );

    return result;
  }
};

export default handleSubscribe;
