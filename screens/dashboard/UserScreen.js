import { SafeAreaView, ScrollView } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
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

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/user/Header";
import Post from "../../components/shared/Post";
import PostsSceleton from "../../components/shared/Sceleton";
import UserEmptyPlaceHolder from "../../components/user/UserEmptyPlaceHolder";
import UserInfo from "../../components/user/UserInfo";

const UserScreen = ({ navigation, route }) => {
  const { userEmail } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [subscribe, setSubscribe] = useState([]);
  const [userData, setUserData] = useState({});

  const { status } = useSelector((state) => state.appUpdate);
  const { email, username, profile_picture, subscribe_list, favorite } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchMyData = async (email) => {
      const dbRef = doc(fsbase, `users/${email}`);
      const postsDetails = await getDoc(dbRef);
      const currentData = postsDetails.data();

      setSubscribe(currentData.subscribe_list);
    };
    const fetchUserData = async (email) => {
      const dbRef = doc(fsbase, `users/${email}`);
      const postsDetails = await getDoc(dbRef);
      const currentData = postsDetails.data();
      setUserData(currentData);
    };
    try {
      fetchMyData(email);
      fetchUserData(userEmail);
    } catch (error) {
      console.log(`fetchData.error`, error.message);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const storage = getStorage();
      const def_avatar = await getDownloadURL(
        ref(storage, `avatarsImage/def_avatar.png`)
      )
        .then((url) => {
          return url;
        })
        .catch((error) => {
          console.log(error);
        });

      const photoUri = await getDownloadURL(
        ref(storage, `avatarsImage/${userEmail}`)
      )
        .then((url) => {
          return url;
        })
        .catch((error) => {
          // console.log(error);
        });
      const q = query(
        collectionGroup(fsbase, "posts"),
        where("email", "==", userEmail)
      );
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        postIdTemp: doc.id,
        profile_picture: photoUri ? photoUri : def_avatar,
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

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserInfo
          userEmail={userEmail}
          postLength={posts.length}
          state={userData}
          setSubscribe={setSubscribe}
          subscribe={subscribe}
          navigation={navigation}
        />
        {isLoading && <PostsSceleton />}
        {posts.length > 0 &&
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
