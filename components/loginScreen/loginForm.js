import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { validate } from "email-validator";

import { authSignInUser } from "../../redux/auth/authOperation";

const loginFormSchema = yup.object().shape({
  email: yup.string().email().required("An Email is required"),
  password: yup
    .string()
    .required()
    .min(6, "Your password has to have at least 6 characters"),
});

const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const onLogin = async (email, password) => {
    const user = {
      email,
      password,
      navigation,
    };

    dispatch(authSignInUser(user));
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          await onLogin(values.email, values.password);
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
                autoFocus={false}
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
              <TouchableOpacity
                onPress={() => navigation.push("ResetPasswordScreen")}
              >
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
