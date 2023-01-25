import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";

import { POSTS } from "../data/posts";

import SafeViewAndroid from "../components/SafeViewAndroid";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";

const HomeScreen = () => {
  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header />
      <Stories />
      <ScrollView>
        {POSTS.length > 0 &&
          POSTS.map((post) => <Post key={post.id} post={post} />)}
      </ScrollView>
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
