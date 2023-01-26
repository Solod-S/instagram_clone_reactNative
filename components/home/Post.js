import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "@rneui/themed";

import { postFooterIcons } from "../../data/postFooterIcons";

const Post = ({ post }) => {
  const { profile_picture, user, postImage, likes, caption, comments } = post;
  return (
    <View style={styles.postContainer}>
      <Divider width={1} orientation="vertical" />
      <PostHeader profile_picture={profile_picture} user={user} />
      <PostImage postImage={postImage} />
      <View style={{ marginHorizontal: 15 }}>
        <PostFooter />
        <Likes likes={likes} />
        <Caption user={user} caption={caption} />
        <CommentSection comments={comments} />
        <Comments comments={comments} />
      </View>
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
  <View style={{ width: "100%", height: 450, marginBottom: 10 }}>
    <Image source={postImage} style={styles.postImage} />
  </View>
);

const PostFooter = () => (
  <View style={{ flexDirection: "row", marginBottom: 5 }}>
    <View style={styles.postFooterLeftContainer}>
      <View style={{ height: 25, width: 25 }}>
        <Icon
          imgStyle={styles.postFooterIcon}
          imgUrl={postFooterIcons[0].image}
        />
      </View>
      <View style={{ height: 25, width: 25 }}>
        <Icon
          imgStyle={styles.postFooterIcon}
          imgUrl={postFooterIcons[1].image}
        />
      </View>
      <View style={{ height: 25, width: 25 }}>
        <Icon
          imgStyle={styles.postFooterIcon}
          imgUrl={postFooterIcons[2].image}
        />
      </View>
    </View>
    <View style={styles.postFooterRightContainer}>
      <View style={{ height: 25, width: 25 }}>
        <Icon
          imgStyle={styles.postFooterIcon}
          imgUrl={postFooterIcons[3].image}
        />
      </View>
    </View>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={imgUrl} />
  </TouchableOpacity>
);

const Likes = ({ likes }) => (
  <Text style={{ color: "white", marginBottom: 5 }}>
    {likes.toLocaleString("en")} likes
  </Text>
);

const Caption = ({ user, caption }) => (
  <Text style={{ color: "white" }}>
    <Text style={{ fontWeight: "600" }}>{user}:</Text>
    <Text> {caption}</Text>
  </Text>
);

const CommentSection = ({ comments }) => (
  <>
    {!!comments.length && (
      <Text style={{ color: "grey" }}>
        View{comments.length > 1 ? " all" : ""} {comments.length}{" "}
        {comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </>
);

const Comments = ({ comments }) => {
  return (
    <>
      {comments.map(({ user, userId, comment }) => (
        <View key={userId} style={{ flexDirection: "row", marginBottom: 2 }}>
          <Text style={{ color: "white" }}>
            <Text style={{ fontWeight: "600" }}>{user}:</Text>
            <Text style={{ color: "whitesmoke" }}> {comment}</Text>
          </Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 30,
  },

  postHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    marginTop: 10,
    marginBottom: 10,
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

  postFooterLeftContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
  postFooterRightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  postFooterIcon: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
});

export default Post;
