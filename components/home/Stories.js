import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";

import { MaterialIcons } from "@expo/vector-icons";

import USERS from "../../data/users";

const storiesData = [
  {
    login: "kikidding",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/ylKTg2Mg_400x400.jpg?alt=media&token=fb4661aa-3a62-4af7-9051-86e5485ea36f",
    data: [
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/1.jpg?alt=media&token=63304587-513b-436d-a228-a6dc0680a16a",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/2.mp4?alt=media&token=fcd41460-a441-4841-98da-d8f9a714dd4d",
        type: "video",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/3.jpg?alt=media&token=326c1809-adc2-4a23-b9c3-8995df7fcccd",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/4.jpg?alt=media&token=e9c5bead-4d9f-40d9-b9fa-c6bc12dd6134",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/5.jpg?alt=media&token=7dcb6c3a-8080-4448-bb2c-c9594e70e572",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/6.jpg?alt=media&token=1121dc71-927d-4517-9a53-23ede1e1b386",
        type: "image",
        finish: 0,
      },
    ],
  },
  {
    login: "kikidding",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/ylKTg2Mg_400x400.jpg?alt=media&token=fb4661aa-3a62-4af7-9051-86e5485ea36f",
    data: [
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/7.jpg?alt=media&token=7e92782a-cd84-43b6-aba6-6fe6269eded6",
        type: "image",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/8.mp4?alt=media&token=5b6af212-045b-4195-9d65-d1cab613bd7f",
        type: "video",
        finish: 0,
      },
      {
        content:
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-f3106.appspot.com/o/9.jpg?alt=media&token=0a382e94-6f3f-4d4e-932f-e3c3f085ebc3",
        type: "image",
        finish: 0,
      },
    ],
  },
];

const Stories = ({ navigation, data, index }) => {
  const { profile_picture } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(false);

  const openNewStoriesScreen = () => {
    setloading(true);
    navigation.push("NewStoryScreen");
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  const openStoriesScreen = () => {
    setloading(true);
    navigation.push("StoriesScreen", { data: storiesData, index: 1 });
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.storyContainer}
          disabled={loading}
          onPress={openNewStoriesScreen}
        >
          <View style={{ position: "relative" }}>
            <MaterialIcons
              name="add-circle"
              size={24}
              color="white"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                zIndex: 999,
              }}
            />
            <Image
              source={{ uri: profile_picture }}
              style={styles.myStoryImg}
            />
          </View>
          <Text style={styles.storyName}>Your story</Text>
        </TouchableOpacity>
        {USERS.length > 0 &&
          USERS.map(({ id, name, image }) => (
            <TouchableOpacity
              key={id}
              style={styles.storyContainer}
              disabled={loading}
              onPress={openStoriesScreen}
            >
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
  myStoryImg: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "white",
  },
  storyName: {
    color: "white",
    // textAlign: "center",
  },
});

export default Stories;
