import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { Formik } from "formik";
import * as yup from "yup";
import { validate } from "email-validator";

import { authSignUpUser } from "../../redux/auth/authOperation";

const SignupFormSchema = yup.object().shape({
  email: yup.string().email().required("An Email is required"),
  username: yup
    .string()
    .required("A username is required")
    .min(2, "Your username has to have at least 2 characters"),
  password: yup
    .string()
    .required()
    .min(6, "Your password has to have at least 6 characters"),
});

const SignupForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const [showPass, setShowPass] = useState(false);

  const toglePass = () => {
    setShowPass(!showPass);
  };

  const onSignup = async (login, email, password) => {
    try {
      const newUser = {
        avatarImage: null,
        login,
        email,
        password,
      };
      console.log(`newUser`, newUser);
      dispatch(authSignUpUser(newUser));
    } catch (error) {
      Alert.alert("Oops...something went wrong, please try again later");
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values) => {
          await onSignup(values.username, values.email, values.password);
          // navigation.push("HomeScreen");
        }}
        validationSchema={SignupFormSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-adress"
                textContentType="emailAddress"
                autoFocus={false}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                style={styles.text}
              />
            </View>
            {/* {errors.email && (
              <Text style={{ color: "red", fontSize: 10, marginBottom: 3 }}>
                {errors.email}
              </Text>
            )} */}
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.username.length || values.username.length > 1
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Username"
                autoCapitalize="none"
                keyboardType="email-adress"
                textContentType="emailAddress"
                autoFocus={false}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                style={styles.text}
              />
            </View>
            {/* {errors.username && (
              <Text style={{ color: "red", fontSize: 10, marginBottom: 3 }}>
                {errors.username}
              </Text>
            )} */}
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length > 5
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!showPass ? true : false}
                textContentType="password"
                autoFocus={false}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                style={{ ...styles.text, paddingRight: 50 }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 14,
                  right: 16,
                  zIndex: 99,
                }}
                activeOpacity={0.6}
                onPress={toglePass}
              >
                <Text style={styles.showPass}>
                  {!showPass ? "Show" : "Hide"}
                </Text>
              </TouchableOpacity>
            </View>
            {/* {errors.password && (
              <Text style={{ color: "red", fontSize: 10 }}>
                {errors.password}
              </Text>
            )} */}

            <TouchableOpacity
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
                <Text style={{ color: "#6BB0F5" }}> Log in</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginTop: 60 },
  inputField: {
    borderRadius: 4,
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  showPass: {
    position: "absolute",
    // fontSize: 16,
    // lineHeight: 19,
    color: "#1B4371",
    right: 5,
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
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

export default SignupForm;
