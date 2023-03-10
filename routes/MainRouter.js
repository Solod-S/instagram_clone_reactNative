import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import getUserInfo from "../firebase/operations/getUserInfo";

import AnimatedLoader from "react-native-animated-loader";

import { authSlice } from "../redux/auth/authReducer";
import { authStateChangeUsers } from "../redux/auth/authOperation";
import { SignedInStack, SignedOutStack } from "./AuthStack";

const MainRouter = () => {
  const { stateChange, email } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateUserData = async () => {
      const { updateUserInfo } = authSlice.actions;
      const currentData = await getUserInfo(email);
      if (currentData) {
        const { user_about, subscribe_list, favorite } = currentData;
        dispatch(updateUserInfo({ user_about, subscribe_list, favorite }));
      }
    };
    try {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      dispatch(authStateChangeUsers());
      if (stateChange) {
        updateUserData();
      }
    } catch (error) {
      console.log(`MainRoute.error`, error);
    }
  }, [stateChange]);

  if (loading) {
    return (
      <AnimatedLoader
        visible={loading}
        overlayColor="rgba(255,255,255,0.75)"
        // source={
        //   (require("./../assets/animation/phone_loader.json"))
        // }
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

export default MainRouter;
