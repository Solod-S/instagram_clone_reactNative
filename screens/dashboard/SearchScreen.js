import { SafeAreaView, FlatList, Keyboard, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import getSearchPosts from "../../firebase/operations/getSearchPosts";
import getAllPosts from "../../firebase/operations/getAllPosts";

import {
  stopUpdatingApp,
  startUpdatingApp,
} from "../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Post from "../../components/shared/Post";
import PostsSkeleton from "../../components/shared/skeletons/PostsSkeleton";
import SearchPanel from "../../components/searchScreen/SearchPanel";
import SearchEmptyPlaceHolder from "../../components/searchScreen/SearchEmptyPlaceHolder";

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { favorite } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);
  const [searchQuery, setsearchQuery] = useState("");

  useEffect(() => {
    const fetchSearchPosts = async () => {
      const searchPosts = await getSearchPosts(searchQuery);

      setIsLoading(false);
      setPosts(searchPosts);
    };
    try {
      if (searchQuery) {
        setIsLoading(true);
        fetchSearchPosts();
      }
    } catch (error) {
    } finally {
      if (status === true) {
        dispatch(stopUpdatingApp());
      }
    }
  }, [searchQuery, status === true]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setIsLoading(false);
      setPosts(posts.sort((a, b) => a.created < b.created));
    };
    try {
      if (!searchQuery) {
        setIsLoading(true);
        fetchPosts();
      }
    } catch (error) {
      console.log(`fetchPosts.error`, error.message);
    } finally {
      if (status === true) {
        dispatch(stopUpdatingApp());
      }
    }
  }, [searchQuery, status === true]);

  useEffect(() => {
    setFavorites(favorite);
  }, [favorite]);

  const keyExtractor = (item) => item?.postId;
  const _renderitem = ({ item }) => (
    <Post
      post={item}
      navigation={navigation}
      favoriteData={favorites}
      setFavorites={setFavorites}
    />
  );

  const handleFormSubmit = (newSearchQuery) => {
    if (newSearchQuery === searchQuery) {
      return;
    }
    if (newSearchQuery !== searchQuery) {
      setsearchQuery("");
    }
    setsearchQuery(newSearchQuery);
    Keyboard.dismiss();
  };

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
      <SearchPanel handleFormSubmit={handleFormSubmit} isLoading={isLoading} />
      {isLoading && <PostsSkeleton />}
      {!isLoading && posts.length > 0 && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={posts}
          initialNumToRender={4}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          // renderItem={({ item }) => {
          //   return (
          //     <Post
          //       post={item}
          //       navigation={navigation}
          //       favoriteData={favorites}
          //       // setFavorites={setFavorites}
          //     />
          //   );
          // }}
          renderItem={_renderitem}
        />
      )}
      {posts.length <= 0 && !isLoading && <SearchEmptyPlaceHolder />}
    </SafeAreaView>
  );
};

export default SearchScreen;
