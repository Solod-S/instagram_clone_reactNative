import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fsbase } from "../firebase/firebase";
import { collectionGroup, query, getDocs } from "firebase/firestore";

import { stopUpdatingApp } from "../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../components/SafeViewAndroid";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import BottomTabs from "../components/home/BottomTabs";
import { bottomTabIcons } from "../data/bottomTabsIcons";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { status } = useSelector((state) => state.appUpdate);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collectionGroup(fsbase, "posts"));
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        postIdTemp: doc.id,
      }));
      // console.log(posts);
      setPosts(posts);
    };
    try {
      fetchPosts();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(stopUpdatingApp());
    }
  }, [status === true]);

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      <Stories />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 50 }}
      >
        {posts.length > 0 &&
          posts
            .sort((a, b) => a.created < b.created)
            .map((post) => (
              <Post key={post.postId} post={post} navigation={navigation} />
            ))}
      </ScrollView>

      <BottomTabs icons={bottomTabIcons} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
