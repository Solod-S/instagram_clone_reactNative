import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";

import FormikStoryUploader from "./FormikStoryUploader";

const AddNewStoryScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} loading={loading} />
      <FormikStoryUploader
        navigation={navigation}
        setLoading={setLoading}
        loading={loading}
      />
    </View>
  );
};

const Header = ({ navigation, loading }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity disabled={loading} onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/back-icon.png")}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NEW STORY</Text>
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
  },
  headerText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
    // marginRight: 25,
  },
});

export default AddNewStoryScreen;
