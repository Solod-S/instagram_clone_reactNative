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

import { authResetPassword } from "../../redux/auth/authOperation";

const resetFormSchema = yup.object().shape({
  email: yup.string().email().required("An Email is required"),
});

const ResetForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const onReset = async (email, password) => {
    dispatch(authResetPassword(email));
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await onReset(values.email);
        }}
        validationSchema={resetFormSchema}
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
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
                <Text style={{ color: "#6BB0F5" }}>Remember password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button(isValid)}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Resset password</Text>
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

export default ResetForm;
