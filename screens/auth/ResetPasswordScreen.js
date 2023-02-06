import { StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native";

import ResetForm from "../../components/resetPasswordScreen/ResetForm";
import SafeViewAndroid from "../../components/SafeViewAndroid";

const ResetPasswordScreen = ({ navigation }) => (
  <SafeAreaView
    style={{
      ...SafeViewAndroid.AndroidSafeArea,
      backgroundColor: "white",
    }}
  >
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </View>
      <ResetForm navigation={navigation} />
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

export default ResetPasswordScreen;
