import { SafeAreaView } from "react-native";

import SafeViewAndroid from "../../../components/SafeViewAndroid";

import AddNewPost from "../../../components/newPost/AddNewPost";

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
