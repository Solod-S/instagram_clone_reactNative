import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSlice } from "../../redux/auth/authReducer";

import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fsbase } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";

import { startUpdatingApp } from "../../redux/auth/appUpdateSlice";

import { MaterialIcons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";

const UserInfoEditor = ({
  seteditorMode,
  username,
  profile_picture,
  email,
  user_about,
}) => {
  const initialState = {
    description: user_about ? user_about : "",
    avatar: "",
  };

  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);

  const handelAvatar = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setState((prevstate) => ({
          ...prevstate,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.log(`handelAvatar.error`, error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    if (!state.avatar) {
      return;
    }
    const storage = getStorage();
    const storageRef = ref(storage, `avatarsImage/${email}`);

    const response = await fetch(state.avatar);
    const file = await response.blob();

    const uploadPhoto = await uploadBytes(storageRef, file).then(() => {});

    const photoUri = await getDownloadURL(ref(storage, `avatarsImage/${email}`))
      .then((url) => {
        return url;
      })
      .catch((error) => {
        console.log(error);
      });
    await updateProfilePhoto(photoUri);
    return photoUri;
  };

  const updateProfilePhoto = async (photoUri) => {
    const auth = getAuth();
    await updateProfile(auth.currentUser, {
      photoURL: photoUri,
    });
  };

  const submit = async () => {
    const { updateUserInfo } = authSlice.actions;
    try {
      const avatarUri = await uploadPhotoToServer();
      const dbRef = doc(fsbase, `users/${email}`);
      // const userDetails = await getDoc(dbRef);
      // const currentData = userDetails.data();

      await updateDoc(dbRef, {
        user_about: state.description ? state.description.trim() : "",
        profile_picture: avatarUri ? avatarUri : profile_picture,
      });
      dispatch(
        updateUserInfo({
          user_about: state.description ? state.description.trim() : "",
          profile_picture: avatarUri ? avatarUri : profile_picture,
        })
      );
      setState({
        description: "",
        avatar: "",
      });
      seteditorMode(false);
      dispatch(startUpdatingApp());
    } catch (error) {
      console.log(`submit.error`, error.message);
    }
  };
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
          }}
        >
          <View style={{ flex: 1, alignItems: "center", fontWeight: "700" }}>
            <TouchableOpacity
              style={{ position: "relative" }}
              onPress={handelAvatar}
            >
              <Image
                source={{ uri: state.avatar ? state.avatar : profile_picture }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginBottom: 5,
                }}
              />
              <MaterialIcons
                name="add-a-photo"
                size={54}
                color="white"
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  bottom: "25%",
                  opacity: 0.7,
                }}
              />
            </TouchableOpacity>
            <Text style={{ color: "white", marginBottom: 5 }}>{username}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 2,
            justifyContent: "space-between",
          }}
        >
          <View>
            <TextInput
              placeholder="Enter description"
              placeholderTextColor="gray"
              style={{
                minHeight: 100,
                color: "white",
                fontSize: 16,
                paddingTop: 4,
                paddingBottom: 4,
                paddingHorizontal: 15,
                borderRadius: 6,
                borderColor: "white",
                borderWidth: 0.5,
                marginBottom: 10,
              }}
              multiline={true}
              value={state.description}
              onChangeText={(text) =>
                setState((prevstate) => ({
                  ...prevstate,
                  description: text,
                }))
              }
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 6,
                  borderColor: "white",
                  borderWidth: 0.5,
                }}
                onPress={submit}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    padding: 10,
                    opacity: 0.6,
                  }}
                >
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 6,
                  borderColor: "white",
                  borderWidth: 0.5,
                }}
                onPress={() => seteditorMode(false)}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    padding: 10,
                    opacity: 0.6,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Divider width={0.2} orientation="vertical" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: { justifyContent: "center", alignItems: "center" },
  number: { color: "white", fontWeight: "600", fontSize: 18 },
  description: { color: "white" },
});

export default UserInfoEditor;
