import { fsbase } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const handleFavorite = async (currentFavorite, userIdTemp) => {
  const dbRef = doc(fsbase, `users/${userIdTemp}`);
  const postsDetails = await getDoc(dbRef);
  const currentData = postsDetails.data();
  const alreadyInFavorite = currentData.favorite.includes(currentFavorite);

  if (!alreadyInFavorite) {
    await updateDoc(dbRef, {
      favorite: firebase.firestore.FieldValue.arrayUnion(currentFavorite),
    });

    const result = [...currentData.favorite, currentFavorite];

    return result;
  } else {
    await updateDoc(dbRef, {
      favorite: firebase.firestore.FieldValue.arrayRemove(currentFavorite),
    });
    const result = currentData.favorite.filter(
      (favorite) => favorite !== currentFavorite
    );
    return result;
  }
};

export default handleFavorite;
