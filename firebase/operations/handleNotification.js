import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { fsbase } from "../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";

const handleNotification = async (email, data, action) => {
  const date = new Date().toLocaleDateString();
  const time = new Date()
    .toLocaleTimeString()
    .split(":")
    .splice(0, 2)
    .join(":");
  const created = Date.now().toString();
  const notificationId = uuidv4();

  switch (action) {
    case "commentAction":
      await addDoc(collection(fsbase, `users/${email}/journal/`), {
        ...data,
        description: "left a comment",
        created,
        notificationId,
        date,
        time,
        watched: false,
      });
      break;

    case "likeAction":
      await addDoc(collection(fsbase, `users/${email}/journal/`), {
        ...data,
        created,
        notificationId,
        date,
        time,
        watched: false,
      });
      break;

    case "subscribeAction":
      await addDoc(collection(fsbase, `users/${email}/journal/`), {
        ...data,
        created,
        notificationId,
        date,
        time,
        watched: false,
      });
      break;

    default:
      console.log("no action");
      break;
  }
};

export default handleNotification;
