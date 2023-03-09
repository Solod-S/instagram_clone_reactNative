import { SafeAreaView, LogBox } from "react-native";
import { useEffect, useState, useRef } from "react";

import getComments from "../../../firebase/operations/getComments";

import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import AddNewComment from "../../../components/newCommentScreen/AddNewComment";

const NewCommentScreen = ({ navigation, route }) => {
  const prevCommentsRef = useRef();

  const { post } = route.params;

  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    prevCommentsRef.current = comments;

    const fetchComments = async (email, postIdTemp) => {
      const comments = await getComments(email, postIdTemp);
      if (prevCommentsRef.current.length !== comments.length) {
        setComments(comments);
      }
      setIsLoading(false);
    };
    try {
      setIsLoading(true);
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
        isLoading={isLoading}
      />
    </SafeAreaView>
  );
};

export default NewCommentScreen;

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
