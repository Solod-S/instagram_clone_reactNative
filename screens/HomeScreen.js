import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { fsbase } from "../firebase/firebase";
import {
  collectionGroup,
  query,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import { stopUpdatingApp } from "../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../components/SafeViewAndroid";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Post from "../components/home/Post";
import BottomTabs from "../components/BottomTabs";

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { email } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);
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
      console.log(`fetchFavorite.error`);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        const q = query(collectionGroup(fsbase, "posts"));
        const snapshot = await getDocs(q);
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          postIdTemp: doc.id,
        }));
        setPosts(posts.sort((a, b) => a.created < b.created));
      };

      try {
        fetchPosts();
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(stopUpdatingApp());
      }
    }, [status === true])
  );

  const keyExtractor = (item) => item?.postId;

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      <Stories />
      {posts.length > 0 && (
        <FlatList
          data={posts}
          // initialNumToRender={4}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => {
            return (
              <Post
                post={item}
                navigation={navigation}
                favoriteData={favorites}
              />
            );
          }}
        />
      )}
      <BottomTabs navigation={navigation} pageName="Home" />
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
