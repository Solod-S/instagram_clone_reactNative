import { fsbase } from "../firebase";
import { collectionGroup, query, getDocs, where } from "firebase/firestore";

import getUserInfo from "./getUserInfo";

const getStories = async (subscribe_list) => {
  const q = query(
    collectionGroup(fsbase, "stories"),
    where("email", "in", subscribe_list)
  );
  const snapshot = await getDocs(q);
  const allSubscription = await Promise.all(
    snapshot.docs.map(async (doc) => {
      return {
        ...doc.data(),
        postIdTemp: doc.id,
      };
    })
  );

  const allData = await Promise.all(
    subscribe_list.map(async (item) => {
      const userData = await getUserInfo(item);
      if (!userData) {
        return;
      }
      return {
        email: item,
        avatar: userData.profile_picture,
        login: userData.login,
        data: allSubscription
          .filter((st) => st.email === item)
          .sort((a, b) => b.created < a.created),
      };
    })
  );

  return allData.filter((item) => item && item.data.length > 0);
};

export default getStories;
