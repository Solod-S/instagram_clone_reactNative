import { ref, getStorage, getDownloadURL } from "firebase/storage";

const getAvatar = async (action, email) => {
  const storage = getStorage();
  switch (action) {
    case "default":
      return await getDownloadURL(ref(storage, `avatarsImage/def_avatar.png`))
        .then((url) => {
          return url;
        })
        .catch((error) => {
          console.log(`default_avatar.error`, error.message);
        });

      break;

    case "user":
      return await getDownloadURL(ref(storage, `avatarsImage/${email}`))
        .then((url) => {
          return url;
        })
        .catch((error) => {
          // console.log(`user_avatar.error`, error.message);
        });
      break;

    default:
      console.log("no action");
      break;
  }
};

export default getAvatar;
