import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fsbase } from "../../../firebase/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  getDocs,
  getDoc,
  updateDoc,
  getFirestore,
  query,
  collection,
} from "firebase/firestore";

import getAvatar from "../../../firebase/operations/getAvatar";
import getUserInfo from "../../../firebase/operations/getUserInfo";
import getPostInfo from "../../../firebase/operations/getPostInfo";

import { NotificationSceleton } from "../../../components/shared/Sceleton";
import Header from "../../../components/NotificationScreen/Header";
import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import Journal from "../../../components/NotificationScreen/Journal";

const NotificationScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const { email } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchNotification = async () => {
      const def_avatar = await getAvatar("default");
      const q = query(collection(fsbase, `users/${email}/journal/`));

      const notificationSnapshot = await getDocs(q);
      const notification = await Promise.all(
        notificationSnapshot.docs.map(async (doc) => {
          const userEmail = await doc.data().userEmail;
          const postId = doc.data().postId;
          const photoUri = await getAvatar("user", userEmail);
          const userData = await getUserInfo(userEmail);
          let postData = null;

          if (postId) {
            const post = await getPostInfo(email, postId);
            postData = { ...post, postIdTemp: postId };
          }
          return {
            ...doc.data(),
            profile_picture: photoUri ? photoUri : def_avatar,
            login: userData.login,
            post: postData,
          };
        })
      );

      setNotification(notification.sort((a, b) => a.created < b.created));
      setIsLoading(false);
    };
    try {
      setIsLoading(true);
      fetchNotification();
    } catch (error) {}
  }, []);
  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      {isLoading && <NotificationSceleton />}
      {notification.length > 0 && (
        <Journal navigation={navigation} notification={notification} />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
