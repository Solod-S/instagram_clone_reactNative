import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { collection, addDoc } from "firebase/firestore";
import { fsbase } from "../firebase";

import handleMedia from "./handleMedia";

const handleStory = async (mediaFile, fileType, email) => {
  const mediaFileLink = await handleMedia(mediaFile, "stories");
  console.log(mediaFileLink);
  const uniqueStoryId = uuidv4();
  const date = new Date().toLocaleDateString();
  const time = new Date()
    .toLocaleTimeString()
    .split(":")
    .splice(0, 2)
    .join(":");
  const created = Date.now().toString();

  await addDoc(collection(fsbase, `users/${email}/stories/`), {
    created,
    date,
    time,
    email,
    storiesId: uniqueStoryId,
    content: mediaFileLink,
    type: fileType,
    finish: 0,
  });
};

export default handleStory;
