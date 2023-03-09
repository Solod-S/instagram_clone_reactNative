import { SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import getSubscription from "../../../firebase/operations/getSubscription";

import SubscriptionUser from "../../../components/subscriptionScreen/SubscriptionUser";
import SubscriptionEmptyPlaceHolder from "../../../components/subscriptionScreen/SubscriptionEmptyPlaceHolder";
import Header from "../../../components/subscriptionScreen/Header";
import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import SubscriptionSkeleton from "../../../components/shared/skeletons/SubscriptionSkeleton";

const SubscriptionScreen = ({ navigation, route }) => {
  const { userData, userEmail } = route.params;
  const { email, subscribe_list } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const canFethMyUserData =
        userEmail === email && subscribe_list.length > 0;

      if (canFethMyUserData) {
        setIsLoading(true);
        const updatedUsers = await getSubscription(subscribe_list);
        if (users.length !== updatedUsers.length) {
          setUsers(updatedUsers);
        }
        setIsLoading(false);
      } else {
        setUsers([]);
      }
    };
    try {
      fetchUsers();
    } catch (error) {
      console.log(`fethMyUserData.error`, error.message);
    }
  }, [subscribe_list]);

  useEffect(() => {
    const fetchUsers = async () => {
      const canFethCurrentUserData =
        userEmail !== email && userData.subscribe_list.length > 0;

      if (canFethCurrentUserData) {
        setIsLoading(true);
        const updatedUsers = await getSubscription(userData.subscribe_list);
        if (users.length !== updatedUsers.length) {
          setUsers(updatedUsers);
        }
        setIsLoading(false);
      } else {
        setUsers([]);
      }
    };
    try {
      fetchUsers();
    } catch (error) {
      console.log(`fethCurrentUserData.error`, error.message);
    }
  }, [userData]);

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      {isLoading && <SubscriptionSkeleton />}
      {users.length > 0 && !isLoading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 10 }}
        >
          {users.map((user) => (
            <SubscriptionUser
              key={user.email}
              user={user}
              navigation={navigation}
              setUsers={setUsers}
              email={email}
              userEmail={userEmail}
            />
          ))}
        </ScrollView>
      )}
      {users.length <= 0 && !isLoading && <SubscriptionEmptyPlaceHolder />}
    </SafeAreaView>
  );
};

export default SubscriptionScreen;
