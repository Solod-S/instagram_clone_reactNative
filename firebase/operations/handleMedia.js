import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const handleMedia = async (media, path) => {
  if (!media) {
    return;
  }
  const storage = getStorage();
  const uniquePostId = uuidv4();
  const storageRef = ref(storage, `${path}/${uniquePostId}`);

  const response = await fetch(media);
  const file = await response.blob();

  await uploadBytes(storageRef, file).then(() => {});

  const processedPhoto = await getDownloadURL(
    ref(storage, `${path}/${uniquePostId}`)
  )
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log(`error.processedPhoto`, error.message);
    });
  return processedPhoto;
};

export default handleMedia;
