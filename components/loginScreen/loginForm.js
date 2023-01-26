import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";

const LoginForm = () => (
  <View style={styles.wrapper}>
    <View style={styles.inputField}>
      <TextInput
        placeholderTextColor="#444"
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-adress"
        textContentType="emailAddress"
        autoFocus={true}
      />
    </View>
    <View style={styles.inputField}>
      <TextInput
        placeholderTextColor="#444"
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        autoFocus={true}
      />
    </View>
    <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
      <TouchableOpacity>
        <Text style={{ color: "#6BB0F5" }}>Forget password?</Text>
      </TouchableOpacity>
    </View>
    {/* <Button title="Log in" /> */}
    <Pressable titleSize={20} style={styles.button}>
      <Text style={styles.buttonText}>Log in</Text>
    </Pressable>
    <View style={styles.signUpContainer}>
      <Text>Don't have an account?</Text>
      <TouchableOpacity>
        <Text style={{ color: "#6BB0F5" }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: { marginTop: 60 },
  inputField: {
    borderRadius: 4,
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  button: {
    backgroundColor: "#0096F6",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 20,
  },
  signUpContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default LoginForm;
