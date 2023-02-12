import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
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
import Header from "../../components/shared/Header";
import Post from "../../components/shared/Post";
import PostsSceleton from "../../components/shared/Sceleton";

const FavoritesScreen = ({ navigation }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);
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
      handlePlaceHolder(favoriteData);
    };

    try {
      fetchFavorite(email);
    } catch (error) {
      console.log(`fetchFavorite.error`, error.message);
    } finally {
      dispatch(stopUpdatingApp());
    }
  }, [status === true]);

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
      handlePlaceHolder(favoriteList);
    };

    try {
      setIsLoading(true);
      handleFavoritesCollection();
    } catch (error) {
      console.log(`handleFavoritesCollection.error`, error.message);
    } finally {
      dispatch(stopUpdatingApp());
    }
  }, [favorites]);

  const keyExtractor = (item) => item?.postId;

  const handlePlaceHolder = (favoriteList) => {
    favoriteList.length > 0
      ? setShowPlaceholder(false)
      : setShowPlaceholder(true);
  };
  if (showPlaceholder) {
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
            source={require("../../assets/icons/favorites-empty.png")}
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

      {isLoading && <PostsSceleton />}
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

const styles = StyleSheet.create({
  lottie: {
    width: 400,
    height: 400,
    zIndex: -1,
    // height: "80%",
    // backgroundColor: "black",
  },
});
