import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Keyboard,
} from "react-native";
import { Divider } from "@rneui/themed";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { fsbase } from "../../firebase/firebase";

import { startUpdatingApp } from "../../redux/auth/appUpdateSlice";

const PLACEHOLDERIMG =
  "https://www.shorekids.co.nz/wp-content/uploads/2014/08/ig-placeholder-500.jpg";

const uploadPostSchema = yup.object().shape({
  caption: yup
    .string()
    .max(2200, "Caption has reached the character limits")
    .required(),
});

const FormikPostUploader = ({ navigation }) => {
  const dispatch = useDispatch();
  const { owner_uid, username, email, profile_picture } = useSelector(
    (state) => state.auth
  );
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

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const uniquePostId = uuidv4();
    const storageRef = ref(storage, `photos/${uniquePostId}`);

    const response = await fetch(postImage);
    const file = await response.blob();

    await uploadBytes(storageRef, file).then(() => {});

    const processedPhoto = await getDownloadURL(
      ref(storage, `photos/${uniquePostId}`)
    )
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log(`error.processedPhoto`, error);
      });
    return processedPhoto;
  };

  const imageHander = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setPostImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("error.imageHander", error.message);
    }
  };

  const uploadPostToServer = async (caption) => {
    try {
      const postPhoto = await uploadPhotoToServer();
      const uniquePostId = uuidv4();
      const date = new Date().toLocaleDateString();
      const time = new Date()
        .toLocaleTimeString()
        .split(":")
        .splice(0, 2)
        .join(":");
      const created = Date.now().toString();
      await addDoc(collection(fsbase, `users/${email}/posts/`), {
        caption,
        created,
        date,
        time,
        likes: 0,
        liked_users: [],
        postImage,
        profile_picture,
        user: username,
        email,
        owner_uid,
        postId: uniquePostId,
      });
      dispatch(startUpdatingApp());
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
          await uploadPostToServer(values.caption);
          setPostImage("");
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
                onPress={imageHander}
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
                    Send
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
