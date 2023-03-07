import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { fsbase } from "../../firebase/firebase";

const PLACEHOLDERIMG =
  "https://www.shorekids.co.nz/wp-content/uploads/2014/08/ig-placeholder-500.jpg";

const uploadPostSchema = yup.object().shape({
  caption: yup
    .string()
    .max(2200, "Caption has reached the character limits")
    .required(),
});

const FormikStoryUploader = ({ navigation, setLoading, loading }) => {
  const { email } = useSelector((state) => state.auth);

  const [postImage, setPostImage] = useState("");
  const [fileType, setFileType] = useState("");

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const uniquePostId = uuidv4();
    const storageRef = ref(storage, `stories/${uniquePostId}`);

    const response = await fetch(postImage);
    const file = await response.blob();

    await uploadBytes(storageRef, file).then(() => {});

    const processedPhoto = await getDownloadURL(
      ref(storage, `stories/${uniquePostId}`)
    )
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log(`error.processedPhoto`, error.message);
      });
    return processedPhoto;
  };

  const imageHander = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result.assets[0]);
        setPostImage(result.assets[0].uri);
        setFileType(result.assets[0].type);
      }
    } catch (error) {
      console.log("error.imageHander", error.message);
    }
  };

  const uploadStoryToServer = async () => {
    try {
      const postPhoto = await uploadPhotoToServer();
      const uniqueStoryId = uuidv4();
      const date = new Date().toLocaleDateString();
      const time = new Date()
        .toLocaleTimeString()
        .split(":")
        .splice(0, 2)
        .join(":");
      const created = Date.now().toString();
      await addDoc(collection(fsbase, `users/${email}/stories/`), {
        created,
        date,
        time,
        email,
        storiesId: uniqueStoryId,
        content: postPhoto,
        type: fileType,
        finish: 0,
      });
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
          setPostImage("");
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
                onPress={imageHander}
                style={{ borderRadius: 15 }}
              >
                <Image
                  source={{
                    uri: postImage ? postImage : PLACEHOLDERIMG,
                  }}
                  style={{
                    height: "90%",
                    backgroundColor: "white",
                    borderRadius: 15,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!isSubmitting && postImage.length === 0}
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
                      postImage.length !== 0 && !isSubmitting
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
