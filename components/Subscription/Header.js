import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/back-icon.png")}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>SUBSCRIPTION</Text>
    <Text></Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
  },
  headerText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
  },
});

export default Header;
