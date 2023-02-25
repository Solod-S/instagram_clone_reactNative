import { View, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";

const SearchPanel = ({ handleFormSubmit, isLoading }) => {
  const [state, setState] = useState("");

  return (
    <View
      style={{
        marginHorizontal: 12,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <TextInput
        style={{
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
          paddingHorizontal: 10,
          paddingRight: 40,
          fontSize: 16,
          height: 40,
          flex: 1,
          backgroundColor: "white",
        }}
        // onChangeText={(value) =>
        //   setState((prevState) => ({ ...prevState, email: value }))
        // }
        onChangeText={(value) => setState(value)}
        value={state}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          height: 40,
          width: 40,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => handleFormSubmit(state)}
        // disabled={!state}
        disabled={isLoading}
      >
        <Image
          source={require("../../assets/icons/search_icon.png")}
          style={{
            width: 32,
            height: 32,
            // position: "absolute",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchPanel;
