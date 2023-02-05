import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Divider } from "@rneui/themed";

const UserInfo = ({ username, postLength, profile_picture, favorites }) => {
  console.log(username);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        paddingHorizontal: 5,
      }}
    >
      <View style={{ flex: 1, alignItems: "center", fontWeight: "700" }}>
        <Image
          source={{ uri: profile_picture }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ color: "white" }}>{username}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-around",
        }}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.number}>{postLength}</Text>
          <Text style={styles.description}>pos...</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.number}>{favorites.length}</Text>
          <Text style={styles.description}>fav...</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.number}>0</Text>
          <Text style={styles.description}>sub...</Text>
        </View>
      </View>
      <Divider width={0.2} orientation="vertical" />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: { justifyContent: "center", alignItems: "center" },
  number: { color: "white", fontWeight: "600", fontSize: 18 },
  description: { color: "white" },
});

export default UserInfo;
