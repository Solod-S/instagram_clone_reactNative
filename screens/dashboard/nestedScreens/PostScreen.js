import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useSelector } from "react-redux";

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

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../../assets/back-icon.png")}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NOTIFICATION</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,

    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
  },
});

export default PostScreen;
