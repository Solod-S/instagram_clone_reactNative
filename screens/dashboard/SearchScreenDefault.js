import { SafeAreaView, ScrollView, View, Keyboard } from "react-native";
import { useEffect, useState, useLayoutEffect } from "react";

import { fsbase } from "../../firebase/firebase";
import { collectionGroup, query, getDocs } from "firebase/firestore";

import SafeViewAndroid from "../../components/SafeViewAndroid";
import Header from "../../components/profile/Header";
import Post from "../../components/shared/Post";
import PostsSceleton from "../../components/shared/Sceleton";
import SearchPanel from "../../components/searchScreen/SearchPanel";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setsearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState([]);

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

      setIsLoading(false);
      setPosts(filteredPost);
    };
    try {
      if (searchQuery) {
        setIsLoading(true);
        fetchPosts();
      }
    } catch (error) {}
  }, [searchQuery]);

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
