import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { authSignOutUser } from "../../redux/auth/authOperation";
import getNewNotifications from "../../firebase/operations/getNewNotifications";

const Header = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const { email } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const newNotification = await getNewNotifications(email);

      setNotification(newNotification.length);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(`NotificationScreen.error`, error.message);
    }
  }, [isFocused]);

  const logOut = () => {
    setLoading(true);
    dispatch(authSignOutUser());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const createPost = () => {
    setLoading(true);
    navigation.push("NewPostScreen");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const goToNotification = () => {
    setLoading(true);
    navigation.push("NotificationScreen");
    setTimeout(() => {
      setLoading(false);
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

        <TouchableOpacity onPress={goToNotification}>
          {notification > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{notification}</Text>
            </View>
          )}
          <Image
            source={require("../../assets/heart-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image
            source={require("../../assets//msg-icon.png")}
            style={styles.icon}
          />
        </TouchableOpacity> */}
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
    bottom: 14,
    width: 25,
    height: 25,
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
