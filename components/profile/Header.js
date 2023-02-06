import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperation";

import { useState, useEffect } from "react";

const Header = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const { status } = useSelector((state) => state.appUpdate);
  const dispatch = useDispatch();

  const logOut = () => {
    setloading(true);
    dispatch(authSignOutUser());
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  const createPost = () => {
    setloading(true);

    navigation.push("NewPostScreen");
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={logOut}>
        <Image
          style={styles.logo}
          source={require("../../assets/header-logo.png")}
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <TouchableOpacity disabled={loading} onPress={createPost}>
          <Image
            source={require("../../assets/add-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/heart-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            source={require("../../assets//msg-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  iconContainer: {
    flexDirection: "row",
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: "contain",
  },
  unreadBadge: {
    backgroundColor: "#ff3250",
    position: "absolute",
    left: 13,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
    fontWeight: "600",
  },
});

export default Header;
