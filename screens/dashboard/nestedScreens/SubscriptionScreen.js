import { SafeAreaView, ScrollView, View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { fsbase } from "../../../firebase/firebase";
import { collection, query, getDocs, where } from "firebase/firestore";

import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import Header from "../../../components/Subscription/Header";
import { PostsSceleton } from "../../../components/shared/Sceleton";
import UserEmptyPlaceHolder from "../../../components/user/UserEmptyPlaceHolder";
import SubscriptionUser from "../../../components/Subscription/SubscriptionUser";

const SubscriptionScreen = ({ navigation, route }) => {
  const { userData, userEmail } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { email, subscribe_list, favorite } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const canFethMyUserData =
        userEmail === email && subscribe_list.length > 0;

      if (canFethMyUserData) {
        setIsLoading(true);
        const q = query(
          collection(fsbase, "users"),
          where("email", "in", subscribe_list)
          // where("arr", "array-contains-any", "id")
        );
        const snapshot = await getDocs(q);
        const updatedUsers = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        if (users.length !== updatedUsers.length) {
          setUsers(updatedUsers);
        }
        setIsLoading(false);
      } else {
        setUsers([]);
        setIsLoading(false);
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
        const q = query(
          collection(fsbase, "users"),
          where("email", "in", userData.subscribe_list)
          // where("arr", "array-contains-any", "id")
        );
        const snapshot = await getDocs(q);
        const updatedUsers = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        if (users.length !== updatedUsers.length) {
          setUsers(updatedUsers);
        }
        setIsLoading(false);
      } else {
        setUsers([]);
        setIsLoading(false);
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
      {users.length <= 0 && !isLoading && (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/icons/subscribe-empty.png")}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
            <Text style={{ color: "white" }}>
              There aren't any subscriptions...
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default SubscriptionScreen;
