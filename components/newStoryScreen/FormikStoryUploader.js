import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Formik } from "formik";
import * as yup from "yup";

import handleStory from "../../firebase/operations/handleStory";
import { startUpdatingApp } from "../../redux/auth/appUpdateSlice";

const PLACEHOLDERIMG =
  "https://www.shorekids.co.nz/wp-content/uploads/2014/08/ig-placeholder-500.jpg";

const uploadPostSchema = yup.object().shape({
  caption: yup
    .string()
    .max(2200, "Caption has reached the character limits")
    .required(),
});

const FormikStoryUploader = ({ navigation, setLoading, loading }) => {
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);

  const [mediaFile, setMediaFile] = useState("");
  const [fileType, setFileType] = useState("");

  const imageHandler = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setMediaFile(result.assets[0].uri);
        setFileType(result.assets[0].type);
      }
    } catch (error) {
      console.log("error.imageHandler", error.message);
    }
  };

  const uploadStoryToServer = async () => {
    const makeStory = async (mediaFile, fileType, email) => {
      await handleStory(mediaFile, fileType, email);
      dispatch(startUpdatingApp());
    };
    try {
      makeStory(mediaFile, fileType, email);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
      }}
    >
      {/* <ScrollView> */}
      <Formik
        initialValues={{ caption: "" }}
        onSubmit={async (values) => {
          if (loading) {
            return;
          }
          setLoading(true);
          await uploadStoryToServer();
          setMediaFile("");
          setFileType("");

          setLoading(false);
          navigation.goBack();
        }}
        // validationSchema={uploadPostSchema}
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
                flex: 1,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={imageHandler}
                style={{ borderRadius: 15 }}
              >
                <Image
                  source={{
                    uri: mediaFile ? mediaFile : PLACEHOLDERIMG,
                  }}
                  style={{
                    height: "90%",
                    backgroundColor: "white",
                    borderRadius: 15,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!isSubmitting && mediaFile.length === 0}
                style={{
                  alignItems: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    color:
                      mediaFile.length !== 0 && !isSubmitting
                        ? "white"
                        : "gray",
                    fontSize: 22,
                  }}
                >
                  {loading ? "Loading..." : "Send"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      {/* </ScrollView> */}
    </View>
  );
};

export default FormikStoryUploader;
