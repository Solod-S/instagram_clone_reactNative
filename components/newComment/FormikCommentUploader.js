import { Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { Divider } from "@rneui/themed";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import {
  stopUpdatingApp,
  startUpdatingApp,
} from "../../redux/auth/appUpdateSlice";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { fsbase } from "../../firebase/firebase";
import "firebase/compat/firestore";
import { addDoc, collection } from "firebase/firestore";

const uploadCommentSchema = yup.object().shape({
  message: yup
    .string()
    .trim()
    .max(2200, "Message has reached the character limits")
    .required(),
});

const FormikCommentUploader = ({ userIdTemp, postIdTemp, setComments }) => {
  const { status } = useSelector((state) => state.appUpdate);
  const dispatch = useDispatch();
  const { owner_uid, profile_picture, username, email } = useSelector(
    (state) => state.auth
  );
  const handComments = async (
    userId,
    postId,
    comment,
    owner_uid,
    profile_picture,
    username,
    email
  ) => {
    const date = new Date().toLocaleDateString();
    const time = new Date()
      .toLocaleTimeString()
      .split(":")
      .splice(0, 2)
      .join(":");
    const created = Date.now().toString();
    const commentId = uuidv4();
    await addDoc(
      collection(fsbase, `users/${userId}/posts/${postId}/comments/`),
      {
        comment,
        commentId,
        created,
        time,
        date,
        owner_uid,
        profile_picture,
        user: username,
        email,
      }
    );
    dispatch(startUpdatingApp());
    setComments((prevState) => [
      ...prevState,
      {
        comment,
        commentId,
        created,
        time,
        date,
        owner_uid,
        profile_picture,
        user: username,
        email,
      },
    ]);
  };

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={async (values, actions) => {
        const { message } = values;
        try {
          await handComments(
            userIdTemp,
            postIdTemp,
            message,
            owner_uid,
            profile_picture,
            username,
            email
          );
          actions.setSubmitting(false);
          actions.resetForm();
        } catch (error) {
          console.log(`handComments.error`, error);
        }
      }}
      validationSchema={uploadCommentSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
        isSubmitting,
      }) => (
        <View
          style={{
            position: "absolute",
            padding: 5,
            bottom: 0,
            width: "100%",
            height: 50,
          }}
        >
          <Divider width={1} orientation="vertical" />
          <TextInput
            placeholder="Enter message"
            placeholderTextColor="gray"
            style={{
              color: "white",
              fontSize: 16,
              paddingLeft: 12,
              paddingRight: 70,
              paddingTop: 6,
            }}
            multiline={true}
            onChangeText={handleChange("message")}
            onBlur={handleBlur("message")}
            value={values.message}
          />

          <TouchableOpacity
            disabled={!isValid && isSubmitting}
            style={{
              width: 100,
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
              position: "absolute",
              right: 0,
              top: 12,
            }}
            onPress={handleSubmit}
          >
            <Text
              style={{
                color: isValid && !isSubmitting ? "white" : "gray",
                fontSize: 18,
              }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default FormikCommentUploader;
