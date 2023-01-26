import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native";

import SafeViewAndroid from "../components/SafeViewAndroid";
import LoginForm from "../components/loginScreen/loginForm";
const LoginScreen = () => (
  <SafeAreaView
    style={{
      ...SafeViewAndroid.AndroidSafeArea,
      backgroundColor: "white",
    }}
  >
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
      <LoginForm />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "white",
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    height: 100,
    width: 100,
  },
});

export default LoginScreen;
