import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const Journal = ({ navigation, notification }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {notification.length > 0 &&
          notification.map((item) => (
            <NotificationItem
              notification={item}
              key={item.created}
              navigation={navigation}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/back-icon.png")}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>NOTIFICATION</Text>
    <Text></Text>
  </View>
);

const NotificationItem = ({ notification, navigation }) => {
  const {
    profile_picture,
    description,
    login,
    postImage,
    postId,
    time,
    date,
    userEmail,
  } = notification;
  return (
    <View style={styles.notificationContainer}>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => navigation.push("UserScreen", { userEmail: userEmail })}
      >
        <Image style={styles.userImg} source={{ uri: profile_picture }} />
        <Text style={styles.userLogin}>
          {login.length > 7
            ? login.slice(0, 6).toLowerCase() + "..." + " :"
            : login.toLowerCase() + ":"}
        </Text>
      </TouchableOpacity>
      <View style={styles.description}>
        <Text style={styles.descriptionText}>{description}</Text>
        <Text style={styles.date}>
          at {time} || {date}
        </Text>
      </View>

      <View style={styles.postImg}>
        {postId && (
          <Image style={styles.postImag} source={{ uri: postImage }} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,

    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
  },
  notificationContainer: {
    marginBottom: 10,
    // justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
  },
  userImg: {
    width: 40,
    height: 40,
    marginRight: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ff8501",
  },
  userLogin: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 15,
  },
  description: { width: "40%" },
  descriptionText: {
    color: "whitesmoke",
    fontWeight: "400",
    fontSize: 15,
  },
  date: {
    color: "gray",
    fontWeight: "400",
    fontSize: 12,
  },
  postImag: {
    // marginRight: 10,
    width: 40,
    height: 40,
    // borderRadius: 50,
    // marginLeft: 6,
    borderWidth: 1,
    borderColor: "#ff8501",
  },
  postImg: {
    width: "20%",
  },
});

export default Journal;
