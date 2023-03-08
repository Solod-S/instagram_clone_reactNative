import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";

import fetchStories from "../../firebase/operations/fetchStories";
import { StoriesSkeleton } from "../shared/Skeleton";

const Stories = ({ navigation }) => {
  const { profile_picture, email, subscribe_list } = useSelector(
    (state) => state.auth
  );
  const { status } = useSelector((state) => state.appUpdate);
  const isFocused = useIsFocused();
  const [loading, setloading] = useState(false);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchData = async (subscribe_list) => {
      if (subscribe_list.length <= 0) {
        setloading(false);
        return;
      }
      const stories = await fetchStories(subscribe_list);
      setStories(stories);
      setloading(false);
    };

    try {
      setloading(true);
      fetchData(subscribe_list);
    } catch (error) {}
  }, [subscribe_list, isFocused, status === true]);

  const openNewStoriesScreen = () => {
    setloading(true);
    navigation.push("NewStoryScreen");
    setTimeout(() => {
      setloading(false);
    }, 2000);
  };

  const openStoriesScreen = (index) => {
    setloading(true);
    navigation.push("StoriesScreen", { data: stories, index });
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
        {loading && <StoriesSkeleton />}
        {stories.length > 0 &&
          !loading &&
          stories.map(({ email, login, avatar }, index) => (
            <TouchableOpacity
              key={email}
              style={styles.storyContainer}
              disabled={loading}
              onPress={() => openStoriesScreen(index)}
            >
              <Image source={{ uri: avatar }} style={styles.storyImg} />
              <Text style={styles.storyName}>
                {login.length > 11
                  ? login.slice(0, 10).toLowerCase() + "..."
                  : login.toLowerCase()}
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
