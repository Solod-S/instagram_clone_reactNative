import {
  SafeAreaView,
  FlatList,
  View,
  Keyboard,
  Text,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fsbase } from "../../firebase/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collectionGroup, query, getDocs } from "firebase/firestore";

import { stopUpdatingApp } from "../../redux/auth/appUpdateSlice";
import getAvatar from "../../firebase/operations/getAvatar";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Post from "../../components/shared/Post";
import { PostsSkeleton } from "../../components/shared/Skeleton";
import SearchPanel from "../../components/searchScreen/SearchPanel";

const SearchScreen = ({ navigation }) => {
  const { favorite, email } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);
  const [searchQuery, setsearchQuery] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const def_avatar = await getAvatar("default");
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
          const photoUri = await getAvatar("user", item.email);

          return {
            ...item,
            profile_picture: photoUri ? photoUri : def_avatar,
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

  useEffect(() => {
    const fetchPosts = async () => {
      const def_avatar = await getAvatar("default");
      const q = query(collectionGroup(fsbase, "posts"));
      const snapshot = await getDocs(q);
      const posts = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const userData = doc.data();
          const photoUri = await getAvatar("user", userData.email);
          return {
            ...doc.data(),
            postIdTemp: doc.id,
            profile_picture: photoUri ? photoUri : def_avatar,
          };
        })
      );
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
      dispatch(stopUpdatingApp());
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
              source={require("../../assets/icons/serach-emprty.png")}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
            <Text style={{ color: "white" }}>
              Sorry, we couldn't find posts and users that contain "
              {searchQuery}"
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
