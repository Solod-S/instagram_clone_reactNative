import { View, Image, TouchableOpacity, Text } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { authSlice } from "../../redux/auth/authReducer";
import handleSubscribe from "../../firebase/operations/handleSubscribe";

import { Ionicons } from "@expo/vector-icons";

const SubscriptionUser = ({ user, setUsers, email, navigation, userEmail }) => {
  const dispatch = useDispatch();

  const [loading, setloading] = useState(false);

  const onSubscribe = async () => {
    const { updateUserInfo } = authSlice.actions;
    const result = await handleSubscribe(email, user.email);
    dispatch(updateUserInfo({ subscribe_list: result }));
  };

  const goToUser = () => {
    setloading(true);

    navigation.push("UserScreen", {
      userEmail: user.email,
    });
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <View>
        <TouchableOpacity
          disabled={loading}
          onPress={goToUser}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={{ uri: user.profile_picture }}
            style={{
              width: 35,
              height: 35,
              marginRight: 5,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "#ff8501",
            }}
          />
          <Text style={{ color: "white", fontSize: 16 }}>{user.login}</Text>
        </TouchableOpacity>
      </View>
      <View>
        {email === userEmail && (
          <TouchableOpacity
            style={{
              marginLeft: "auto",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
            onPress={onSubscribe}
          >
            <Ionicons name="person-remove" size={22} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SubscriptionUser;
