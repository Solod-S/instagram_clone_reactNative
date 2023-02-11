import {
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FacebookLoader,
  InstagramLoader,
} from "react-native-easy-content-loader";

import { fsbase } from "../../firebase/firebase";
import {
  collectionGroup,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import firebase from "firebase/compat";
import { stopUpdatingApp } from "../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../components/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Post from "../../components/home/Post";

const FavoritesScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { email } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorite = async (email) => {
      const dbRef = doc(fsbase, `users/${email}`);
      const postsDetails = await getDoc(dbRef);
      const currentData = postsDetails.data();
      const favoriteData = currentData.favorite;
      setFavorites(favoriteData);
      console.log(1);
    };

    try {
      fetchFavorite(email);
    } catch (error) {
      console.log(`fetchFavorite.error`);
    }
  }, [status]);

  useEffect(() => {
    const fetchFavoritePost = async (id) => {
      const postsCollection = collectionGroup(fsbase, "posts");
      const q = query(postsCollection, where("postId", "==", id));

      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        postIdTemp: doc.id,
      }));

      return posts[0];
    };

    const handleFavoritesCollection = async () => {
      const favoriteList = await Promise.all(
        favorites.map(async (favorite) => await fetchFavoritePost(favorite))
      );

      setPosts(favoriteList.sort((a, b) => a.created < b.created));
      setIsLoading(false);
    };

    try {
      setIsLoading(true);
      handleFavoritesCollection();
    } catch (error) {
      console.log(`handleFavoritesCollection.error`);
    } finally {
      dispatch(stopUpdatingApp());
    }
  }, [favorites]);

  const keyExtractor = (item) => item?.postId;

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />

      {isLoading && (
        <ScrollView>
          <InstagramLoader
            active
            listSize={4}
            imageHeight={300}
            primaryColor="#434446"
            secondaryColor="#303030"
            aSize={40}
            sTHeight={0}
          />
        </ScrollView>
      )}
      {posts.length > 0 && !isLoading && (
        <FlatList
          data={posts}
          initialNumToRender={4}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => {
            return (
              <Post
                post={item}
                navigation={navigation}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;
