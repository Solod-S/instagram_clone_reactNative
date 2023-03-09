import { SafeAreaView, ScrollView, RefreshControl } from "react-native";
import { useEffect, useState, useLayoutEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import getUserInfo from "../../firebase/operations/getUserInfo";
import getPostsByEmail from "../../firebase/operations/getPostsByEmail";

import {
  stopUpdatingApp,
  startUpdatingApp,
} from "../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/userScreen/Header";
import Post from "../../components/shared/Post";
import PostsSkeleton from "../../components/shared/skeletons/PostsSkeleton";
import UserEmptyPlaceHolder from "../../components/userScreen/UserEmptyPlaceHolder";
import UserInfo from "../../components/userScreen/UserInfo";

const UserScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { userEmail } = route.params;

  const { status } = useSelector((state) => state.appUpdate);
  const { email, favorite } = useSelector((state) => state.auth);

  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [subscribe, setSubscribe] = useState([]);
  const [userData, setUserData] = useState({});

  useLayoutEffect(() => {
    const fetchMyData = async (email) => {
      const currentData = await getUserInfo(email);

      setSubscribe(currentData.subscribe_list);
    };
    const fetchUserData = async (userEmail) => {
      const currentData = await getUserInfo(userEmail);
      setUserData(currentData);
    };
    try {
      fetchMyData(email);
      fetchUserData(userEmail);
    } catch (error) {
      console.log(`fetchData.error`, error.message);
    } finally {
      if (status === true) {
        dispatch(stopUpdatingApp());
      }
    }
  }, [status === true]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPostsByEmail(userEmail);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ flex: 1 }}
      >
        <UserInfo
          userEmail={userEmail}
          postLength={posts.length}
          state={userData}
          setSubscribe={setSubscribe}
          subscribe={subscribe}
          navigation={navigation}
        />
        {isLoading && <PostsSkeleton />}
        {posts.length > 0 &&
          !isLoading &&
          posts
            .sort((a, b) => a.created < b.created)
            .map((post) => (
              <Post
                key={post.postId}
                post={post}
                navigation={navigation}
                favoriteData={favorite}
              />
            ))}
        {!posts.length && <UserEmptyPlaceHolder />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;
