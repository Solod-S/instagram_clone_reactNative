import { Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { memo } from "react";

import { fsbase } from "../../firebase/firebase";
import {
  collectionGroup,
  query,
  getDocs,
  doc,
  getDoc,
  where,
} from "firebase/firestore";

import {
  stopUpdatingApp,
  startUpdatingApp,
} from "../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../components/SafeViewAndroid";
// import BottomTabs from "../components/BottomTabs";
import Header from "../../components/profile/Header";
import MyPost from "../../components/profile/MyPost";

import UserInfo from "../../components/profile/UserInfo";

const ProfileScreenDefault = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { status } = useSelector((state) => state.appUpdate);
  const { email, username, profile_picture } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const fetchFavorite = async (email) => {
      const dbRef = doc(fsbase, `users/${email}`);
      const postsDetails = await getDoc(dbRef);
      const currentData = postsDetails.data();
      const favoriteData = currentData.favorite;
      setFavorites(favoriteData);
    };
    try {
      fetchFavorite(email);
    } catch (error) {
      console.log(`fetchFavorite.error`);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(
        collectionGroup(fsbase, "posts"),
        where("email", "==", email)
      );
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        postIdTemp: doc.id,
      }));

      setPosts(posts);
    };
    try {
      fetchPosts();
    } catch (error) {
      console.log(error);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        // style={{ marginBottom: 50 }}
      >
        <UserInfo
          username={username}
          postLength={posts.length}
          profile_picture={profile_picture}
          favorites={favorites}
        />
        {posts.length > 0 &&
          posts
            .sort((a, b) => a.created < b.created)
            .map((post) => (
              <MyPost
                key={post.postId}
                post={post}
                navigation={navigation}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            ))}
      </ScrollView>

      {/* <BottomTabs navigation={navigation} pageName="Profile" /> */}
    </SafeAreaView>
  );
};

export default ProfileScreenDefault;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
