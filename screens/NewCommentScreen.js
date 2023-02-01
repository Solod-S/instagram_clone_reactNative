import { SafeAreaView } from "react-native";
import { useEffect, useState, useRef } from "react";

import { fsbase } from "../firebase/firebase";
import "firebase/compat/firestore";
import { collection, query, getDocs } from "firebase/firestore";

import SafeViewAndroid from "../components/SafeViewAndroid";
import AddNewComment from "../components/newComment/AddNewComment";

const NewCommentScreen = ({ navigation, route }) => {
  const prevCommentsRef = useRef();
  const [comments, setComments] = useState([]);
  const { post } = route.params;

  useEffect(() => {
    prevCommentsRef.current = comments;
    const fetchComments = async (email, postIdTemp) => {
      const q = query(
        collection(fsbase, `users/${email}/posts/${postIdTemp}/comments`)
      );
      const snapshot = await getDocs(q);
      const newComments = snapshot.docs.map((doc) => ({
        ...doc.data(),
        commentIdTemp: doc.id,
      }));
      const sortedComments = newComments.sort((a, b) => b.created < a.created);

      if (prevCommentsRef.current.length !== sortedComments.length) {
        setComments(sortedComments);
      }
    };
    try {
      fetchComments(post.email, post.postIdTemp);
    } catch (error) {
      console.log(`fetchComments.error`, error);
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
