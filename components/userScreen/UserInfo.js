import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import getUserInfo from "../../firebase/operations/getUserInfo";
import { authSlice } from "../../redux/auth/authReducer";

import { Ionicons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";

const UserInfo = ({
  postLength,
  state,
  userEmail,
  subscribe,
  setSubscribe,
  navigation,
}) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { email } = useSelector((state) => state.auth);

  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      const handleSubscribe = async (userEmail) => {
        const userDetails = await getUserInfo(userEmail);

        if (userDetails.subscribe_list.length !== subscribe.length) {
          setSubscribe(userDetails.subscribe_list);
        }
      };

      try {
        handleSubscribe(userEmail);
      } catch (error) {
        console.log(`handleSubscribe.error`, error.message);
      }
    }
  }, [isFocused]);

  const goToSubscription = () => {
    setloading(true);

    navigation.push("SubscriptionScreen", {
      userData: state,
      userEmail,
    });
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  const onSubscribe = async () => {
    const { updateUserInfo } = authSlice.actions;
    const result = await handleSubscribe(email, userEmail);
    setSubscribe(result);
    dispatch(updateUserInfo({ subscribe_list: result }));
  };
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
              <TouchableOpacity
                style={{ justifyContent: "center", alignItems: "center" }}
                disabled={loading}
                onPress={goToSubscription}
              >
                <Text style={styles.number}>
                  {state.subscribe_list ? state.subscribe_list.length : 0}
                </Text>
                <Text style={styles.description}>sub...</Text>
              </TouchableOpacity>
            </View>
          </View>
          {email !== userEmail &&
            (!subscribe.includes(userEmail) ? (
              <TouchableOpacity
                style={{
                  marginLeft: "auto",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
                onPress={onSubscribe}
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
                onPress={onSubscribe}
              >
                <Ionicons name="person-remove" size={22} color="white" />
                <Text style={{ color: "white", fontSize: 12 }}>
                  {" "}
                  UNSUBSCRIBE
                </Text>
              </TouchableOpacity>
            ))}
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
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    justifyContent: "center",
  },
  description: { color: "white" },
});
export default UserInfo;
