import { Formik } from "formik";
import * as yup from "yup";
import { validate } from "email-validator";
import { useState } from "react";
import firebase from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required("An Email is required"),
  password: yup
    .string()
    .required()
    .min(6, "Your password has to have at least 6 characters"),
});

const LoginForm = ({ navigation }) => {
  const updateDataAsyncSt = async (email, password, uid) => {
    try {
      const user = {
        email,
        password,
        uid,
      };
      await AsyncStorage.mergeItem("UserData", JSON.stringify(user));
      Alert.alert("Success!", "Your data has been updated.");
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      const { uid, displayName, photoURL } = auth.currentUser;
      updateDataAsyncSt(email, password, uid);
    } catch (error) {
      Alert.alert("Oops!..", "Error! Email or password doesn't match!", [
        { text: "ok", onPress: () => console.log("Ok"), style: "cancel" },
        { text: "Sign Up", onPress: () => navigation.push("SignupScreen") },
      ]);
      // Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          await onLogin(values.email, values.password);
          // navigation.push("HomeScreen");
        }}
        validationSchema={loginFormSchema}
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
                autoFocus={true}
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
                secureTextEntry={true}
                textContentType="password"
                autoFocus={true}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                style={styles.text}
              />
            </View>
            {/* {errors.password && (
              <Text style={{ color: "red", fontSize: 10 }}>
                {errors.password}
              </Text>
            )} */}
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <TouchableOpacity>
                <Text style={{ color: "#6BB0F5" }}>Forget password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
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

export default LoginForm;
