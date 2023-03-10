import { Image, View, Text, TouchableOpacity, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { authSlice } from "../../redux/auth/authReducer";
import { startUpdatingApp } from "../../redux/auth/appUpdateSlice";

import patchUserInfo from "../../firebase/operations/patchUserInfo";

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

  const handleAvatar = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.4,
      });

      if (!result.canceled) {
        setState((prevstate) => ({
          ...prevstate,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.log(`handleAvatar.error`, error.message);
    }
  };

  const submit = async () => {
    const SubmitChanges = async (
      avatar,
      email,
      description,
      profile_picture
    ) => {
      const { updateUserInfo } = authSlice.actions;
      const avatarUri = await patchUserInfo(
        avatar,
        email,
        description,
        profile_picture
      );
      dispatch(
        updateUserInfo({
          user_about: description ? description.trim() : "",
          profile_picture: avatarUri ? avatarUri : profile_picture,
        })
      );

      setState({
        description: "",
        avatar: "",
      });

      seteditorMode(false);
      dispatch(startUpdatingApp());
    };

    try {
      SubmitChanges(state.avatar, email, state.description, profile_picture);
    } catch (error) {
      console.log(`submit.error`, error.message);
    }
  };
  return (
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
            onPress={handleAvatar}
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
  );
};

export default UserInfoEditor;
