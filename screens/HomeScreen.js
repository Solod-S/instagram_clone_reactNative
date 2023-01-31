import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { fsbase } from "../firebase/firebase";
import {
  collection,
  collectionGroup,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { useEffect, useState } from "react";

// import { posts } from "../data/posts";
import { bottomTabIcons } from "../data/bottomTabsIcons";

import SafeViewAndroid from "../components/SafeViewAndroid";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import BottomTabs from "../components/home/BottomTabs";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const handlePostsAndComments = async () => {
      const q = query(collection(fsbase, "users"));
      const snapshot = await getDocs(q);
      const users = snapshot.docs.map((doc) => ({
        ...doc.data(),
        userIdTemp: doc.id,
      }));

      const postByOne = await Promise.all(
        users.map(async (elem) => {
          const posts = query(
            collection(fsbase, `users/${elem.userIdTemp}/posts`)
          );

          const postsDetails = await getDocs(posts);

          const postsInfo = postsDetails.docs.map((doc) => ({
            ...doc.data(),
            postIdTemp: doc.id,
            userIdTemp: elem.userIdTemp,
          }));
          return postsInfo;
        })
      );

      const allPosts = [];

      for (const post of postByOne) {
        allPosts.push(...post);
      }

      const commentsAndPosts = await Promise.all(
        allPosts.map(async (el) => {
          const commetns = query(
            collection(
              fsbase,
              `users/${el.userIdTemp}/posts/${el.postIdTemp}/comments`
            )
          );

          const commetnsDetails = await getDocs(commetns);
          const commetnsInfo = commetnsDetails.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          return { ...el, comments: commetnsInfo };
        })
      );

      setPosts(commentsAndPosts);
    };

    try {
      handlePostsAndComments();
    } catch (error) {
      console.log(error);
    } finally {
      setRefresh(false);
    }
  }, [refresh === true]);

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
          posts.map((post) => (
            <Post
              key={post.postIdTemp}
              post={post}
              navigation={navigation}
              setRefresh={setRefresh}
            />
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
