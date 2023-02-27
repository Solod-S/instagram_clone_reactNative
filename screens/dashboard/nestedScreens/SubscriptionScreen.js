import { SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

import { fsbase } from "../../../firebase/firebase";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  collectionGroup,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";

import { stopUpdatingApp } from "../../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import Header from "../../../components/Subscription/Header";
import Post from "../../../components/shared/Post";
import PostsSceleton from "../../../components/shared/Sceleton";
import UserEmptyPlaceHolder from "../../../components/user/UserEmptyPlaceHolder";
import SubscriptionUser from "../../../components/Subscription/SubscriptionUser";

const SubscriptionScreen = ({ navigation, route }) => {
  const { userEmail } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const { email, subscribe_list, favorite } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    const fetchUsers = async () => {
      if (userEmail === email && subscribe_list.length > 0) {
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
      } else {
        setUsers([]);
      }
    };
    try {
      // setIsLoading(true);
      fetchUsers();
    } catch (error) {
      console.log(`fetchUsers.error`, error.message);
    } finally {
    }
  }, [subscribe_list]);

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 10 }}
      >
        {users.length > 0 &&
          users.map((user) => (
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
    </SafeAreaView>
  );
};

export default SubscriptionScreen;
