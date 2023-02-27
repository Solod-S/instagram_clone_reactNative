import { View, Image, TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { authSlice } from "../../redux/auth/authReducer";
import handleSubscribe from "../../firebase/operations/handleSubscribe";

const SubscriptionUser = ({ user, setUsers, email, navigation, userEmail }) => {
  const { updateUserInfo } = authSlice.actions;
  const dispatch = useDispatch();
  const onSubscribe = async () => {
    const result = await handleSubscribe(email, user.email);
    dispatch(updateUserInfo({ subscribe_list: result }));
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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
