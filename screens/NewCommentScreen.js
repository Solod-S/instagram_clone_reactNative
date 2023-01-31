import { SafeAreaView } from "react-native";

import SafeViewAndroid from "../components/SafeViewAndroid";
import AddNewComment from "../components/newComment/AddNewComment";

const NewCommentScreen = ({ navigation, route }) => {
  const { post } = route.params;
  // console.log(post);
  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <AddNewComment navigation={navigation} post={post} />
    </SafeAreaView>
  );
};

export default NewCommentScreen;
