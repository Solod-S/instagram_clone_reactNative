import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import getFavoritePost from "../../firebase/operations/getFavoritePost";

import {
  stopUpdatingApp,
  startUpdatingApp,
} from "../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Post from "../../components/shared/Post";
import PostsSkeleton from "../../components/shared/skeletons/PostsSkeleton";
import FavoritesEmptyPlaceHolder from "../../components/favoritesScreen/FavoritesEmptyPlaceHolder";

const FavoritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { favorite } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);

  useEffect(() => {
    setFavorites(favorite);
  }, [favorite]);

  useEffect(() => {
    const handleFavoritesCollection = async () => {
      const favoriteList = await Promise.all(
        favorites.map(async (favorite) => await getFavoritePost(favorite))
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
      if (status === true) {
        dispatch(stopUpdatingApp());
      }
    }
  }, [favorites, status === true]);

  const keyExtractor = (item) => item?.postId;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(startUpdatingApp());
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      {isLoading && <PostsSkeleton />}
      {posts.length > 0 && !isLoading && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
        <FavoritesEmptyPlaceHolder />
      )}
    </SafeAreaView>
  );
};

export default FavoritesScreen;
