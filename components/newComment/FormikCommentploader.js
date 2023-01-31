import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

const uploadPostSchema = yup.object().shape({
  message: yup
    .string()
    .max(2200, "Message has reached the character limits")
    .required(),
});

const FormikCommentploader = ({ navigation }) => {
  const [commentMsg, setCommentMsg] = useState("");
  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values) => {
        console.log(values), navigation.goBack();
      }}
      validationSchema={uploadPostSchema}
      validateOnMount={false}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <View style={{ position: "relative", padding: 5 }}>
          <Divider width={1} orientation="vertical" />
          <TextInput
            onChange={(e) => setCommentMsg(e.nativeEvent.text)}
            placeholder="Enter message"
            placeholderTextColor="gray"
            style={{ color: "white", fontSize: 16 }}
            multiline={true}
            onChangeText={handleChange("message")}
            onBlur={handleBlur("message")}
            value={values.message}
          />

          <TouchableOpacity
            disabled={!isValid}
            style={{
              width: 100,
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
              position: "absolute",
              right: 0,
            }}
            onPress={handleSubmit}
          >
            <Text style={{ color: "white", fontSize: 22 }}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default FormikCommentploader;
