import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { fsbase } from "../firebase/firebase";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  getFirestore,
  updateDoc,
  increment,
} from "firebase/firestore";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";

import { useEffect } from "react";

import { posts } from "../data/posts";
import { bottomTabIcons } from "../data/bottomTabsIcons";

import SafeViewAndroid from "../components/SafeViewAndroid";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import BottomTabs from "../components/home/BottomTabs";

const getPosts = async () => {
  const q = query(collection(fsbase, "users"));
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  // console.log(data, "users");

  data.map(async (elem) => {
    const posts = query(collection(fsbase, `users/${elem.id}/posts`));
    const postsDetails = await getDocs(posts);
    const postsInfo = postsDetails.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(postsInfo);
  });
};

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      <Stories />
      <ScrollView style={{ marginBottom: 50 }}>
        {posts.length > 0 &&
          posts.map((post) => <Post key={post.id} post={post} />)}
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
