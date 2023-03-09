import { View, Image, Text } from "react-native";

const PostsEmptyPlaceHolder = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/icons/subscribe-empty.png")}
        style={{ width: 200, height: 200, marginBottom: 10 }}
      />
      <Text style={{ color: "white" }}>
        You don't have any subscriptions...
      </Text>
    </View>
  );
};
export default PostsEmptyPlaceHolder;
