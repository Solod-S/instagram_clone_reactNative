import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";

const UserInfo = ({
  seteditorMode,
  username,
  postLength,
  profile_picture,
  favorites,
  user_about,
}) => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <View style={{ alignItems: "center", fontWeight: "700" }}>
            <Image
              source={{ uri: profile_picture }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 5,
                backgroundColor: "white",
              }}
            />
            <Text style={{ color: "white", marginBottom: 5 }}>{username}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ width: 28, marginLeft: "auto" }}
            onPress={() => seteditorMode(true)}
          >
            <MaterialCommunityIcons
              name="account-edit"
              size={28}
              color="white"
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
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
        </View>
        <Divider width={0.2} orientation="vertical" />
      </View>
      {user_about && (
        <Text style={{ color: "white", marginBottom: 5 }}>{user_about}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: { justifyContent: "center", alignItems: "center" },
  number: { color: "white", fontWeight: "600", fontSize: 18 },
  description: { color: "white" },
});

export default UserInfo;
