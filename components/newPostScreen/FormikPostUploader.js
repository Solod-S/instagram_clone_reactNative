import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Formik } from "formik";
import * as yup from "yup";

import handlePost from "../../firebase/operations/handlePost";
import { startUpdatingApp } from "../../redux/auth/appUpdateSlice";

import { Divider } from "@rneui/themed";

const PLACEHOLDERIMG =
  "https://www.shorekids.co.nz/wp-content/uploads/2014/08/ig-placeholder-500.jpg";

const uploadPostSchema = yup.object().shape({
  caption: yup
    .string()
    .max(2200, "Caption has reached the character limits")
    .required(),
});

const FormikPostUploader = ({ navigation, setLoading, loading }) => {
  const dispatch = useDispatch();
  const { owner_uid, username, email } = useSelector((state) => state.auth);

  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 10 * 2
  );
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 20 * 2;
      setdimensions(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      dimensionsHandler.remove();
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const imageHandler = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setPostImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("error.imageHandler", error.message);
    }
  };

  const uploadPostToServer = async (caption) => {
    const makePost = async (caption, postImage, email, username, owner_uid) => {
      await handlePost(caption, postImage, email, username, owner_uid);
      dispatch(startUpdatingApp());
    };
    try {
      makePost(caption, postImage, email, username, owner_uid);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View
      style={{
        // height: "100%",
        flex: 1,
        position: "relative",
      }}
    >
      {/* <ScrollView> */}
      <Formik
        initialValues={{ caption: "" }}
        onSubmit={async (values) => {
          Keyboard.dismiss();
          if (loading) {
            return;
          }

          setLoading(true);

          await uploadPostToServer(values.caption);
          setPostImage("");

          setLoading(false);
          navigation.goBack();
        }}
        validationSchema={uploadPostSchema}
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
          <>
            <View
              style={{
                height: "100%",
                // flex: 1,
                // margin: 20,
                // justifyContent: "space-between",
                // flexDirection: "column",
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={imageHandler}
                style={{ marginBottom: 10 }}
              >
                <Image
                  source={{
                    uri: postImage ? postImage : PLACEHOLDERIMG,
                  }}
                  style={{
                    width: dimensions,
                    height: isKeyboardVisible ? dimensions - 100 : dimensions,
                    backgroundColor: "white",
                  }}
                />
              </TouchableOpacity>

              <View
                style={{
                  position: "absolute",
                  padding: 5,
                  bottom: 0,
                  width: "100%",
                  height: 50,
                }}
              >
                <Divider width={0.2} orientation="vertical" />
                <TextInput
                  placeholder="Write a caption"
                  placeholderTextColor="gray"
                  style={{
                    color: "white",
                    fontSize: 16,
                    paddingLeft: 12,
                    paddingRight: 70,
                    paddingTop: 6,
                  }}
                  multiline={true}
                  onChangeText={handleChange("caption")}
                  // onChange={setCaption(values.caption)}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                  // numberOfLines={3}
                />
                <TouchableOpacity
                  disabled={!isSubmitting && postImage.length === 0}
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
                      color:
                        postImage.length !== 0 && !isSubmitting
                          ? "white"
                          : "gray",
                      fontSize: 18,
                    }}
                  >
                    {loading ? "Loading..." : "Send"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <TouchableOpacity
                // disabled={!isValid}
                disabled={postImage.length === 0}
                style={{
                  width: 100,
                  alignItems: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onPress={handleSubmit}
              >
                <Text style={{ color: "white", fontSize: 22 }}>Share</Text>
              </TouchableOpacity> */}
          </>
        )}
      </Formik>
      {/* </ScrollView> */}
    </View>
  );
};

export default FormikPostUploader;
