import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fsbase } from "../firebase/firebase";
import { collectionGroup, query, getDocs, where } from "firebase/firestore";

import { stopUpdatingApp } from "../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../components/SafeViewAndroid";
import Header from "../components/home/Header";
import Post from "../components/home/Post";
import BottomTabs from "../components/home/BottomTabs";
import UserInfo from "../components/profile/UserInfo";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { status } = useSelector((state) => state.appUpdate);
  const { email, username, profile_picture } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collectionGroup(fsbase, "posts"),
        where("email", "==", email)
      );
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        postIdTemp: doc.id,
      }));

      setPosts(posts);
    };
    try {
      fetchPosts();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopUpdatingApp());
    }
    return (cleanUp = () => {
      dispatch(stopUpdatingApp());
    });
  }, [status === true]);

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
        style={{ marginBottom: 50 }}
      >
        <UserInfo
          username={username}
          postLength={posts.length}
          profile_picture={profile_picture}
        />
        {posts.length > 0 &&
          posts
            .sort((a, b) => a.created < b.created)
            .map((post) => (
              <Post key={post.postId} post={post} navigation={navigation} />
            ))}
      </ScrollView>

      <BottomTabs navigation={navigation} pageName="Profile" />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
