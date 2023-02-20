import { SafeAreaView, ScrollView, View, Keyboard } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fsbase } from "../../firebase/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  collectionGroup,
  query,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/profile/Header";
import Post from "../../components/shared/Post";
import PostsSceleton from "../../components/shared/Sceleton";
import SearchPanel from "../../components/searchScreen/SearchPanel";
import { stopUpdatingApp } from "../../redux/auth/appUpdateSlice";

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);

  const [searchQuery, setsearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useLayoutEffect(() => {
    const fetchFavorite = async (email) => {
      const dbRef = doc(fsbase, `users/${email}`);
      const postsDetails = await getDoc(dbRef);
      const currentData = postsDetails.data();
      // const favoriteData = currentData.favorite;
      const favoriteData = currentData ? await currentData.favorite : [];
      setFavorites(favoriteData);
    };
    try {
      fetchFavorite(email);
    } catch (error) {
      console.log(`fetchFavorite.error`, error.message);
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const storage = getStorage();
      const q = query(collectionGroup(fsbase, "posts"));
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        postIdTemp: doc.id,
      }));
      const filteredPost = posts.filter(
        (doc) =>
          doc.caption
            .toLowerCase()
            .split(" ")
            .includes(searchQuery.toLowerCase()) ||
          doc.user.toLowerCase() === searchQuery.toLowerCase()
      );

      const result = await Promise.all(
        filteredPost.map(async (item) => {
          const photoUri = await getDownloadURL(
            ref(storage, `avatarsImage/${email}`)
          )
            .then((url) => {
              return url;
            })
            .catch((error) => {
              console.log(error);
            });

          return {
            ...item,
            profile_picture: photoUri,
          };
        })
      );

      setIsLoading(false);
      setPosts(result);
    };
    try {
      if (searchQuery) {
        setIsLoading(true);
        fetchPosts();
      }
    } catch (error) {
    } finally {
      dispatch(stopUpdatingApp());
    }
  }, [searchQuery, status === true]);

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

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      <SearchPanel handleFormSubmit={handleFormSubmit} isLoading={isLoading} />

      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 30 }}
        >
          {isLoading && <PostsSceleton />}
          {posts.length > 0 &&
            posts
              .sort((a, b) => a.created < b.created)
              .map((post) => (
                <Post
                  key={post.postId}
                  post={post}
                  navigation={navigation}
                  favoriteData={favorites}
                />
              ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
