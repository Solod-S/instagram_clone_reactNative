import { SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import getNotificationWithStatusChange from "../../../firebase/operations/getNotificationWithStatusChange";

import Header from "../../../components/NotificationScreen/Header";
import Journal from "../../../components/NotificationScreen/Journal";
import NotificationSkeleton from "../../../components/shared/skeletons/NotificationSkeleton";
import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";

const NotificationScreen = ({ navigation }) => {
  const { email } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const notification = await getNotificationWithStatusChange(email);
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
      {isLoading && <NotificationSkeleton />}
      {notification.length > 0 && (
        <Journal navigation={navigation} notification={notification} />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
