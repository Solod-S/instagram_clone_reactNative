import { SafeAreaView } from "react-native";
import { LogBox } from "react-native";
import { useEffect, useState, useRef } from "react";

import { fsbase } from "../../../firebase/firebase";
import "firebase/compat/firestore";
import { collection, query, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import getAvatar from "../../../firebase/operations/getAvatar";

import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import AddNewComment from "../../../components/newComment/AddNewComment";

const NewCommentScreen = ({ navigation, route }) => {
  const prevCommentsRef = useRef();
  const [comments, setComments] = useState([]);
  const { post } = route.params;

  useEffect(() => {
    prevCommentsRef.current = comments;
    const fetchComments = async (email, postIdTemp) => {
      const storage = getStorage();

      const def_avatar = await getAvatar("default");

      const q = query(
        collection(fsbase, `users/${email}/posts/${postIdTemp}/comments`)
      );
      const snapshot = await getDocs(q);
      const newComments = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const photoUri = await getAvatar("user", email);

          const result = {
            ...doc.data(),
            commentIdTemp: doc.id,
            profile_picture: photoUri ? photoUri : def_avatar,
          };
          return result;
        })
      );
      const sortedComments = newComments.sort((a, b) => b.created < a.created);

      if (prevCommentsRef.current.length !== sortedComments.length) {
        setComments(sortedComments);
      }
    };
    try {
      fetchComments(post.email, post.postIdTemp);
    } catch (error) {
      console.log(`fetchComments.error`, error.message);
    }
  }, [comments]);

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <AddNewComment
        navigation={navigation}
        comments={comments}
        post={post}
        setComments={setComments}
      />
    </SafeAreaView>
  );
};

export default NewCommentScreen;

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
