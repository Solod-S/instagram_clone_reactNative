import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fsbase } from "../../firebase/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  collectionGroup,
  query,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";

import { stopUpdatingApp } from "../../redux/auth/appUpdateSlice";
import getAvatar from "../../firebase/operations/getAvatar";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Post from "../../components/shared/Post";
import PostsSceleton from "../../components/shared/Sceleton";

const FavoritesScreen = ({ navigation }) => {
  const { email, favorite, subscribe_list, user_about, profile_picture } =
    useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);

  const dispatch = useDispatch();

  useEffect(() => {
    setFavorites(favorite);
  }, [favorite]);

  useEffect(() => {
    const fetchFavoritePost = async (id) => {
      const def_avatar = await getAvatar("default");
      const postsCollection = collectionGroup(fsbase, "posts");
      const q = query(postsCollection, where("postId", "==", id));

      const snapshot = await getDocs(q);
      const posts = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const userData = doc.data();
          const photoUri = await getAvatar("user", userData.email);

          return {
            ...doc.data(),
            postIdTemp: doc.id,
            profile_picture: photoUri ? photoUri : def_avatar,
          };
        })
      );

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
      console.log(`handleFavoritesCollection.error`, error.message);
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
                favoriteData={favorites}
                // updateData={setFavorites}
                setFavorites={setFavorites}
              />
            );
          }}
        />
      )}
      {favorites.length <= 0 && posts.length <= 0 && !isLoading && (
        <>
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
        </>
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
