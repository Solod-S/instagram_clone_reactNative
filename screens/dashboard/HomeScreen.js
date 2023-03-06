import { SafeAreaView, FlatList, View, Image, Text } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fsbase } from "../../firebase/firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collectionGroup, query, getDocs } from "firebase/firestore";

import { stopUpdatingApp } from "../../redux/auth/appUpdateSlice";
import getAvatar from "../../firebase/operations/getAvatar";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import Header from "../../components/shared/Header";
import Stories from "../../components/home/Stories";
import Post from "../../components/shared/Post";
import { PostsSceleton } from "../../components/shared/Sceleton";

const storiesData = [
  {
    login: "kikidding",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/ylKTg2Mg_400x400.jpg?alt=media&token=fb4661aa-3a62-4af7-9051-86e5485ea36f",
    data: [
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/1.jpg?alt=media&token=63304587-513b-436d-a228-a6dc0680a16a",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/2.mp4?alt=media&token=fcd41460-a441-4841-98da-d8f9a714dd4d",
        type: "video",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/3.jpg?alt=media&token=326c1809-adc2-4a23-b9c3-8995df7fcccd",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/4.jpg?alt=media&token=e9c5bead-4d9f-40d9-b9fa-c6bc12dd6134",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/5.jpg?alt=media&token=7dcb6c3a-8080-4448-bb2c-c9594e70e572",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/6.jpg?alt=media&token=1121dc71-927d-4517-9a53-23ede1e1b386",
        type: "image",
        finish: 0,
      },
    ],
  },
  {
    login: "kikidding",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/ylKTg2Mg_400x400.jpg?alt=media&token=fb4661aa-3a62-4af7-9051-86e5485ea36f",
    data: [
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/7.jpg?alt=media&token=7e92782a-cd84-43b6-aba6-6fe6269eded6",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/8.mp4?alt=media&token=5b6af212-045b-4195-9d65-d1cab613bd7f",
        type: "video",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/9.jpg?alt=media&token=0a382e94-6f3f-4d4e-932f-e3c3f085ebc3",
        type: "image",
        finish: 0,
      },
    ],
  },
];

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
      const subscribeFilteredPost = posts.filter((post) =>
        subscribe_list.includes(post.email)
      );
      setPosts(subscribeFilteredPost.sort((a, b) => a.created < b.created));
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
      <Stories navigation={navigation} data={storiesData} index={1} />

      {isLoading && <PostsSceleton />}
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
