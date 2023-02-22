import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { Divider } from "@rneui/themed";

import { fsbase } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";

const UserInfo = ({ postLength, userEmail, state }) => {
  // const [state, setState] = useState({});
  // useEffect(() => {
  //   const fetchFavorite = async (email) => {
  //     const dbRef = doc(fsbase, `users/${email}`);
  //     const postsDetails = await getDoc(dbRef);
  //     const currentData = postsDetails.data();
  //     console.log(currentData.subscribe_list.includes(userEmail));
  //     setState(currentData);
  //     console.log(state, userEmail);
  //   };
  //   try {
  //     fetchFavorite(userEmail);
  //   } catch (error) {
  //     console.log(`fetchFavorite.error`, error.message);
  //   }
  // }, []);

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignContent: "center",
        }}
      >
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <View style={{ alignItems: "center", fontWeight: "700" }}>
            <Image
              source={{ uri: state.profile_picture }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={{ color: "white" }}>{state.login}</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
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
              {state.favorite ? (
                <Text style={styles.number}>{state.favorite.length}</Text>
              ) : (
                <Text style={styles.number}>0</Text>
              )}
              <Text style={styles.description}>fav...</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.number}>0</Text>
              <Text style={styles.description}>sub...</Text>
            </View>
          </View>
          {/* !!!! */}
          {state ?? state.subscribe_list.includes(userEmail) ? (
            <TouchableOpacity
              style={{
                marginLeft: "auto",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
              // onPress={() => seteditorMode(true)}
            >
              <Ionicons name="person-add" size={22} color="white" />
              <Text style={{ color: "white", fontSize: 12 }}> SUBSCRIBE</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                marginLeft: "auto",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
              // onPress={() => seteditorMode(true)}
            >
              <Ionicons name="person-remove" size={22} color="white" />
              <Text style={{ color: "white", fontSize: 12 }}> UNSUBSCRIBE</Text>
            </TouchableOpacity>
          )}
        </View>
        <Divider width={0.2} orientation="vertical" />
      </View>
      {state.user_about && (
        <Text style={{ color: "white", marginBottom: 5 }}>
          {state.user_about}
        </Text>
      )}
    </View>
  );
};

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
  infoContainer: { justifyContent: "center", alignItems: "center" },
  number: { color: "white", fontWeight: "600", fontSize: 18 },
  description: { color: "white" },
});
export default UserInfo;
