import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Animated,
  StatusBar,
  Button,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Video } from "expo-av";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");
const screenRatio = height / width;

function StoriesScreen({ navigation, route }) {
  const { data, index } = route.params;

  const [loading, setLoading] = useState(false);
  // THE CONTENT
  const [currentIndx, setCurrentIndx] = useState(index);
  const [content, setContent] = useState(data[index].data);
  // for get the duration
  const [end, setEnd] = useState(0);
  // current is for get the current content is now playing
  const [current, setCurrent] = useState(0);
  // if load true then start the animation of the bars at the top
  const [load, setLoad] = useState(false);
  // progress is the animation value of the bars content playing the current state
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setContent(data[currentIndx].data);
  }, [currentIndx]);

  // start() is for starting the animation bars at the top
  function start(n) {
    // checking if the content type is video or not
    if (current && content[current].type == "video") {
      // type video
      if (load) {
        Animated.timing(progress, {
          toValue: 1,
          duration: n,
          useNativeDriver: false,
        }).start(({ finished }) => {
          if (finished) {
            next();
          }
        });
      }
    } else {
      // type image
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          next();
        }
      });
    }
  }

  // handle playing the animation
  function play() {
    start(end);
  }

  // next() is for changing the content of the current content to +1
  function next() {
    // check if the next content is not empty
    if (current !== content.length - 1) {
      let data = [...content];
      data[current].finish = 1;
      setContent(data);
      setCurrent(current + 1);
      progress.setValue(0);
      setLoad(false);
    } else {
      if (data.length > currentIndx + 1) {
        let data = [...content];
        data[current].finish = 1;
        setContent(data);
        progress.setValue(0);

        setCurrent(0);
        setCurrentIndx((prevState) => (prevState += 1));
        return;
      }

      // the next content is empty
      close();
    }
  }

  // previous() is for changing the content of the current content to -1
  function previous() {
    // checking if the previous content is not empty
    if (current - 1 >= 0) {
      let data = [...content];
      data[current].finish = 0;
      setContent(data);
      setCurrent(current - 1);
      progress.setValue(0);
      setLoad(false);
    } else {
      // the previous content is empty

      if (currentIndx - 1 >= 0) {
        let data = [...content];
        data[current].finish = 0;
        setContent(data);
        progress.setValue(0);
        setCurrent(0);
        setCurrentIndx((prevState) => (prevState -= 1));
        return;
      }

      // the next content is empty
      close();
    }
  }

  // closing the modal set the animation progress to 0
  function close() {
    if (loading) {
      return;
    }
    setLoading(true);
    progress.setValue(0);
    setLoad(false);
    navigation.goBack();
    // console.log("close icon pressed");
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }

  return (
    <View style={styles.containerModal}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.backgroundContainer}>
        {/* check the content type is video or an image */}
        {content[current].type == "video" ? (
          <Video
            source={{
              uri: content[current].content,
            }}
            rate={1.0}
            volume={1.0}
            resizeMode="contain"
            shouldPlay={true}
            positionMillis={0}
            onReadyForDisplay={play()}
            onPlaybackStatusUpdate={(AVPlaybackStatus) => {
              // console.log(AVPlaybackStatus);
              setLoad(AVPlaybackStatus.isLoaded);
              setEnd(AVPlaybackStatus.durationMillis);
            }}
            style={{ height: height, width: width }}
          />
        ) : (
          <Image
            onLoadEnd={() => {
              progress.setValue(0);
              play();
            }}
            source={{
              uri: content[current].content,
            }}
            style={{ width: width, height: height, resizeMode: "contain" }}
          />
        )}
      </View>
      <View
        style={{
          flexDirection: "column",
          flex: 1,
        }}
      >
        <LinearGradient
          colors={["rgba(0,0,0,1)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 100,
          }}
        />
        {/* ANIMATION BARS */}
        <View
          style={{
            flexDirection: "row",
            paddingTop: 10,
            paddingHorizontal: 10,
          }}
        >
          {content.map((index, key) => {
            return (
              // THE BACKGROUND
              <View
                key={key}
                style={{
                  height: 2,
                  flex: 1,
                  flexDirection: "row",
                  backgroundColor: "rgba(117, 117, 117, 0.5)",
                  marginHorizontal: 2,
                }}
              >
                {/* THE ANIMATION OF THE BAR*/}
                <Animated.View
                  style={{
                    flex: current == key ? progress : content[key].finish,
                    height: 2,
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  }}
                />
              </View>
            );
          })}
        </View>
        {/* END OF ANIMATION BARS */}

        <View
          style={{
            height: 50,
            flexDirection: "row",

            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          {/* THE AVATAR AND USERNAME  */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: 30, width: 30, borderRadius: 25 }}
              source={{
                uri: data[currentIndx].avatar,
              }}
            />
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                paddingLeft: 10,
              }}
            >
              {data[currentIndx].login}
            </Text>
          </View>
          {/* END OF THE AVATAR AND USERNAME */}
          {/* THE CLOSE BUTTON */}
          <TouchableOpacity
            onPress={() => {
              close();
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",

                height: 50,
                paddingHorizontal: 15,
              }}
            >
              <Ionicons name="ios-close" size={28} color="white" />
            </View>
          </TouchableOpacity>
          {/* END OF CLOSE BUTTON */}
        </View>
        {/* HERE IS THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <TouchableWithoutFeedback onPress={() => previous()}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => next()}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
        {/* END OF THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerModal: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundContainer: {
    position: "absolute",

    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default StoriesScreen;
