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

import fetchNotification from "../../../firebase/operations/fetchNotification";

import { NotificationSceleton } from "../../../components/shared/Sceleton";
import Header from "../../../components/NotificationScreen/Header";
import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import Journal from "../../../components/NotificationScreen/Journal";

const NotificationScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState([]);
  const { email } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const notification = await fetchNotification(email);
      setNotification(notification.sort((a, b) => a.created < b.created));
      setIsLoading(false);
    };
    try {
      setIsLoading(true);
      fetchData();
    } catch (error) {
      console.log(`NotificationScreen.error`, error.message);
    }
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
