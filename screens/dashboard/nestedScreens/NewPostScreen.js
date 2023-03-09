import { SafeAreaView } from "react-native";

import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import AddNewPost from "../../../components/newPostScreen/AddNewPost";

const NewPostScreen = ({ navigation }) => (
  <SafeAreaView
    style={{
      ...SafeViewAndroid.AndroidSafeArea,
      backgroundColor: "black",
    }}
  >
    <AddNewPost navigation={navigation} />
  </SafeAreaView>
);

export default NewPostScreen;
