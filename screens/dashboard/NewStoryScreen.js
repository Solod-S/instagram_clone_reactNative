import { SafeAreaView } from "react-native";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import AddNewStoryScreen from "../../components/newStoryScreen/AddNewStoryScreen";

const NewStoryScreen = ({ navigation }) => (
  <SafeAreaView
    style={{
      ...SafeViewAndroid.AndroidSafeArea,
      backgroundColor: "black",
    }}
  >
    <AddNewStoryScreen navigation={navigation} />
  </SafeAreaView>
);

export default NewStoryScreen;
