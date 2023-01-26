import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";

import { posts } from "../data/posts";
import { bottomTabIcons } from "../data/bottomTabsIcons";

import SafeViewAndroid from "../components/SafeViewAndroid";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import BottomTabs from "../components/home/BottomTabs";

const HomeScreen = ({ navigation }) => (
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
