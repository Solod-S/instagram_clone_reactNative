import { SafeAreaView, FlatList, View, Image, Text } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fsbase } from "../../firebase/firebase";
import { collectionGroup, query, getDocs } from "firebase/firestore";

import { stopUpdatingApp } from "../../redux/auth/appUpdateSlice";
import getAvatar from "../../firebase/operations/getAvatar";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Stories from "../../components/home/Stories";
import Post from "../../components/shared/Post";
import { PostsSceleton } from "../../components/shared/Sceleton";

const HomeScreen = ({ navigation }) => {
  const { favorite, subscribe_list } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      const def_avatar = await getAvatar("default");

      const q = query(collectionGroup(fsbase, "posts"));
      const snapshot = await getDocs(q);
      const posts = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const email = doc.data().email;
          const photoUri = await getAvatar("user", email);
          return {
            ...doc.data(),
            postIdTemp: doc.id,
            profile_picture: photoUri ? photoUri : def_avatar,
          };
        })
      );
      setIsLoading(false);
      const subscribeFilteredPosts = posts.filter((post) =>
        subscribe_list.includes(post.email)
      );
      setPosts(subscribeFilteredPosts.sort((a, b) => a.created < b.created));
    };

    try {
      setIsLoading(true);
      fetchPosts();
    } catch (error) {
      console.log(`fetchPosts.error`, error.message);
    } finally {
      dispatch(stopUpdatingApp());
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
  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      <Stories navigation={navigation} />

      {isLoading && <PostsSceleton />}
      {posts.length > 0 && !isLoading && (
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
              source={require("../../assets/icons/subscribe-empty.png")}
              style={{ width: 200, height: 200, marginBottom: 10 }}
            />
            <Text style={{ color: "white" }}>
              You don't have any subscriptions...
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
