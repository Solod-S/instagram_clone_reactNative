import { SafeAreaView, FlatList, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fsbase } from "../../firebase/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collectionGroup, query, getDocs } from "firebase/firestore";

import { stopUpdatingApp } from "../../redux/auth/appUpdateSlice";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Stories from "../../components/home/Stories";
import Post from "../../components/shared/Post";
import PostsSceleton from "../../components/shared/Sceleton";

const HomeScreen = ({ navigation }) => {
  const { email, favorite, subscribe_list, user_about, profile_picture } =
    useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.appUpdate);
  const authUser = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [favorites, setFavorites] = useState(favorite ? favorite : []);

  const dispatch = useDispatch();

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
      const q = query(collectionGroup(fsbase, "posts"));
      const snapshot = await getDocs(q);
      const posts = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const photoUri = await getDownloadURL(
            ref(storage, `avatarsImage/${doc.data().email}`)
          )
            .then((url) => {
              return url;
            })
            .catch((error) => {
              // console.log(error);
            });
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
      setIsLoading(true);
      fetchPosts();
    } catch (error) {
      console.log(`fetchPosts.error`, error.message);
    } finally {
      dispatch(stopUpdatingApp());
    }
  }, [status === true]);

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
      <Stories />

      {isLoading && (
        <View style={{ Flex: 1 }}>
          <PostsSceleton />
        </View>
      )}
      {posts.length > 0 && (
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
    </SafeAreaView>
  );
};

export default HomeScreen;
