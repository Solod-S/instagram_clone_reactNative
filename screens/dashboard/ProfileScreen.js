import { SafeAreaView, ScrollView, View, Text, Image } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { fsbase } from "../../firebase/firebase";
import {
  collectionGroup,
  query,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";

import { authSlice } from "../../redux/auth/authReducer";
import { stopUpdatingApp } from "../../redux/auth/appUpdateSlice";
import getAvatar from "../../firebase/operations/getAvatar";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/profile/Header";
import Post from "../../components/shared/Post";
import PostsSceleton from "../../components/shared/Sceleton";
import UserInfo from "../../components/profile/UserInfo";
import UserInfoEditor from "../../components/profile/UserInfoEditor";

const ProfileScreen = ({ navigation }) => {
  const {
    email,
    username,
    profile_picture,
    favorite,
    user_about,
    subscribe_list,
  } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);

  const [editorMode, seteditorMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      const { updateUserInfo } = authSlice.actions;
      const dbRef = doc(fsbase, `users/${email}`);
      const userDetails = await getDoc(dbRef);
      const currentData = userDetails.data();
    };

    try {
      fetchUserData();
    } catch (error) {
      console.log(`fetchFavorite.error`, error.message);
    }
  }, []);

  useEffect(() => {
    setFavorites(favorite);
  }, [favorite]);

  useEffect(() => {
    const fetchPosts = async () => {
      const def_avatar = await getAvatar("default");
      const photoUri = await getAvatar("user", email);

      const q = query(
        collectionGroup(fsbase, "posts"),
        where("email", "==", email)
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
      {isLoading && (
        <>
          <PostsSceleton />
        </>
      )}

      {posts.length <= 0 && !isLoading && (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/icons/posts-empty.png")}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
            <Text style={{ color: "white" }}>You don't have any posts..</Text>
          </View>
        </>
      )}

      {!isLoading && posts.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
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
    </SafeAreaView>
  );
};

export default ProfileScreen;
