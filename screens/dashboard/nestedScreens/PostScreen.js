import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

import Header from "../../../components/postScreen/Header";
import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import Post from "../../../components/shared/Post";

const PostScreen = ({ navigation, route }) => {
  const { post } = route.params;
  const { favorite } = useSelector((state) => state.auth);

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "black",
      }}
    >
      <Header navigation={navigation} />
      <Post navigation={navigation} post={post} favoriteData={favorite} />
    </SafeAreaView>
  );
};

export default PostScreen;
