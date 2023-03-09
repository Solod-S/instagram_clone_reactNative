import { SafeAreaView, FlatList, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import getPostsByEmail from "../../firebase/operations/getPostsByEmail";
import getAllPosts from "../../firebase/operations/getAllPosts";

import {
  stopUpdatingApp,
  startUpdatingApp,
} from "../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Stories from "../../components/homeScreen/Stories";
import PostsEmptyPlaceHolder from "../../components/homeScreen/PostsEmptyPlaceHolder";
import Post from "../../components/shared/Post";
import PostsSkeleton from "../../components/shared/skeletons/PostsSkeleton";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { email, favorite, subscribe_list } = useSelector(
    (state) => state.auth
  );
  const { status } = useSelector((state) => state.appUpdate);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      const subscribeFilteredPosts = posts.filter((post) =>
        subscribe_list.includes(post.email)
      );
      const myPosts = await getPostsByEmail(email);
      const preparedPosts = [...subscribeFilteredPosts, ...myPosts];
      setIsLoading(false);
      setPosts(preparedPosts.sort((a, b) => a.created < b.created));
    };
    try {
      setIsLoading(true);
      fetchPosts();
    } catch (error) {
      console.log(`fetchPosts.error`, error.message);
    } finally {
      if (status === true) {
        dispatch(stopUpdatingApp());
      }
    }
  }, [status === true, subscribe_list]);

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
      <Stories navigation={navigation} />

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
      {posts.length <= 0 && !isLoading && <PostsEmptyPlaceHolder />}
    </SafeAreaView>
  );
};

export default HomeScreen;
