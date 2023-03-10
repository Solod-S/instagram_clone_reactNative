import { SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import getPostsByEmail from "../../firebase/operations/getPostsByEmail";

import {
  stopUpdatingApp,
  startUpdatingApp,
} from "../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Post from "../../components/shared/Post";
import PostsSkeleton from "../../components/shared/skeletons/PostsSkeleton";
import UserInfo from "../../components/profileScreen/UserInfo";
import UserInfoEditor from "../../components/profileScreen/UserInfoEditor";
import MyPostsEmptyPlaceHolder from "../../components/profileScreen/MyPostsEmptyPlaceHolder";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const {
    email,
    username,
    profile_picture,
    favorite,
    user_about,
    subscribe_list,
  } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);

  const [refreshing, setRefreshing] = useState(false);
  const [editorMode, seteditorMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);

  useEffect(() => {
    setFavorites(favorite);
  }, [favorite]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPostsByEmail(email);
      setIsLoading(false);
      setPosts(posts);
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
  }, [status === true]);

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
      {!editorMode ? (
        <UserInfo
          seteditorMode={seteditorMode}
          username={username}
          email={email}
          postLength={posts.length}
          profile_picture={profile_picture}
          favorites={favorites}
          user_about={user_about}
          subscribe_list={subscribe_list}
          navigation={navigation}
        />
      ) : (
        <UserInfoEditor
          seteditorMode={seteditorMode}
          username={username}
          email={email}
          postLength={posts.length}
          profile_picture={profile_picture}
          favorites={favorites}
          user_about={user_about}
          subscribe_list={subscribe_list}
          navigation={navigation}
        />
      )}
      {isLoading && <PostsSkeleton />}
      {!isLoading && posts.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {posts
            .sort((a, b) => a.created < b.created)
            .map((post) => (
              <Post
                key={post.postId}
                post={post}
                navigation={navigation}
                favoriteData={favorites}
                setFavorites={setFavorites}
              />
            ))}
        </ScrollView>
      )}
      {posts.length <= 0 && !isLoading && <MyPostsEmptyPlaceHolder />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
