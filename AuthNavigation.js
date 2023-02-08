import { StyleSheet, Text, View } from "react-native";
import { SignedInStack, SignedOutStack } from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import AnimatedLoader from "react-native-animated-loader";
import { useRef, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUsers } from "./redux/auth/authOperation";

const AuthNavigation = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const didMountRef = useRef(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    dispatch(authStateChangeUsers());
  }, [stateChange]);

  if (loading) {
    return (
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        // source={require("./assets/animation/phone_loader.json")}
        source={{
          uri: "https://assets9.lottiefiles.com/packages/lf20_ujvyzbbd.json",
        }}
        animationStyle={styles.lottie}
        speed={1}
      />
    );
  }
  return (
    <NavigationContainer>
      {stateChange ? <SignedInStack /> : <SignedOutStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 400,
    height: "100%",
    backgroundColor: "black",
  },
});

export default AuthNavigation;
