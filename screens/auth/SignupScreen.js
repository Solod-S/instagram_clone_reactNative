import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native";
import { useState, useEffect } from "react";

import SafeViewAndroid from "../../components/shared/SafeViewAndroid";
import SignupForm from "../../components/signUpScreen/SignUp";

const SignupScreen = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const keyboardHide = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        ...SafeViewAndroid.AndroidSafeArea,
        backgroundColor: "white",
      }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <View
            style={{
              ...styles.logoContainer,
              marginTop: isKeyboardVisible ? 0 : 50,
            }}
          >
            <Image
              style={styles.logo}
              source={require("../../assets/logo.png")}
            />
          </View>
          <SignupForm navigation={navigation} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "white",
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
  },
});

export default SignupScreen;
