import { SafeAreaView } from "react-native";

import SafeViewAndroid from "../../../components/shared/SafeViewAndroid";
import Journal from "../../../components/NotificationScreen/Journal";

const NotificationScreen = ({ navigation }) => (
  <SafeAreaView
    style={{
      ...SafeViewAndroid.AndroidSafeArea,
      backgroundColor: "black",
    }}
  >
    <Journal navigation={navigation} />
  </SafeAreaView>
);

export default NotificationScreen;
