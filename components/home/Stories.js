import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import USERS from "../../data/users";

const Stories = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.length > 0 &&
          USERS.map(({ id, name, image }) => (
            <TouchableOpacity key={id} style={styles.storyContainer}>
              <Image source={image} style={styles.storyImg} />
              <Text style={styles.storyName}>
                {name.length > 11
                  ? name.slice(0, 10).toLowerCase() + "..."
                  : name.toLowerCase()}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  storyContainer: {
    alignItems: "center",
  },
  storyImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 2,
    borderColor: "#ff8501",
  },
  storyName: {
    color: "white",
    // textAlign: "center",
  },
});

export default Stories;
