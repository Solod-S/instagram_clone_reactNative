import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "@rneui/themed";

import { postFooterIcons } from "../../data/postFooterIcons";

const Post = ({ post }) => {
  const { profile_picture, user, postImage } = post;
  return (
    <View style={styles.postContainer}>
      <Divider width={1} orientation="vertical" />
      <PostHeader profile_picture={profile_picture} user={user} />
      <PostImage postImage={postImage} />
      <PostFooter />
    </View>
  );
};

const PostHeader = ({ profile_picture, user }) => (
  <View style={styles.postHeaderContainer}>
    <TouchableOpacity style={styles.postHeaderLink}>
      <Image source={profile_picture} style={styles.postHeaderImg} />
      <Text style={styles.postHeaderText}>{user.toLowerCase()}</Text>
    </TouchableOpacity>

    <TouchableOpacity>
      <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
    </TouchableOpacity>
  </View>
);

const PostImage = ({ postImage }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image source={postImage} style={styles.postImage} />
  </View>
);

const PostFooter = () => (
  <Icon imgStyle={styles.postFooterIcon} imgUrl={postFooterIcons[0].image} />
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={imgUrl} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 30,
  },

  postHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },

  postHeaderLink: { flexDirection: "row", alignItems: "center" },

  postHeaderImg: {
    marginRight: 5,
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#ff8501",
  },

  postHeaderText: {
    color: "white",
    marginLeft: 5,
    fontWeight: "700",
  },
  postImage: {
    height: "100%",
    resizeMode: "cover",
  },
  postFooterIcon: {
    width: 33,
    height: 33,
  },
});

export default Post;
