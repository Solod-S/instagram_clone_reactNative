import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
} from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fsbase } from "../../firebase/firebase";
import {
  collectionGroup,
  query,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { stopUpdatingApp } from "../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../components/SafeViewAndroid";
import Header from "../../components/profile/Header";
import Post from "../../components/shared/Post";
import PostsSceleton from "../../components/shared/Sceleton";

const SearchScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { status } = useSelector((state) => state.appUpdate);
  const { email, username, profile_picture } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchFavorite = async (email) => {
      const dbRef = doc(fsbase, `users/${email}`);
      const postsDetails = await getDoc(dbRef);
      const currentData = postsDetails.data();
      const favoriteData = currentData.favorite;
      setFavorites(favoriteData);
    };
    try {
      fetchFavorite(email);
    } catch (error) {
      console.log(`fetchFavorite.error`, error.message);
    }
  }, []);

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
      setIsLoading(false);
      setPosts(posts);
    };
    try {
      setIsLoading(true);
      fetchPosts();
    } catch (error) {
      console.log(`fetchPosts.error`, error.message);
    } finally {
      dispatch(stopUpdatingApp());
    }
  }, [status === true]);

  if (!posts.length) {
    return (
      <SafeAreaView
        style={{
          ...SafeViewAndroid.AndroidSafeArea,
          backgroundColor: "black",
        }}
      >
        <Header navigation={navigation} />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/icons/posts-empty.png")}
            style={{ width: 200, height: 200, marginBottom: 10 }}
          />
          <Text style={{ color: "white" }}>
            You don't have any favorite posts..
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
        // style={{ marginBottom: 50 }}
      >
        {isLoading && <PostsSceleton />}
        {posts.length > 0 &&
          posts
            .sort((a, b) => a.created < b.created)
            .map((post) => (
              <Post
                key={post.postId}
                post={post}
                navigation={navigation}
                favoriteData={favorites}
                // setFavorites={setFavorites}
              />
            ))}
      </ScrollView>

      {/* <BottomTabs navigation={navigation} pageName="Profile" /> */}
    </SafeAreaView>
  );
};

export default SearchScreen;
