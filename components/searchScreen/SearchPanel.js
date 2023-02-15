import { View, TextInput, TouchableOpacity, Image } from "react-native";

const SearchPanel = () => {
  return (
    <View
      style={{
        position: "relative",
        marginHorizontal: 12,
        height: 40,
      }}
    >
      <TextInput
        style={{
          marginTop: 15,
          borderRadius: 12,
          paddingHorizontal: 10,
          paddingRight: 40,
          fontSize: 16,
          height: 40,
          backgroundColor: "white",
        }}
      />
      <TouchableOpacity
      // style={{ position: "absolute", right: 0, bottom: 0 }}
      >
        <Image
          source={require("../../assets/icons/search_icon.png")}
          style={{
            width: 32,
            height: 32,
            position: "absolute",
            right: 5,
            bottom: 4,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchPanel;
