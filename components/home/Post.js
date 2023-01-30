import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Divider } from "@rneui/themed";
import { fsbase } from "../../firebase/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {
  doc,
  collection,
  collectionGroup,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  increment,
  getFirestore,
} from "firebase/firestore";

import { postFooterIcons } from "../../data/postFooterIcons";

const Post = ({ post }) => {
  const currenUser = useSelector((state) => state.auth.owner_uid);

  const {
    profile_picture,
    user,
    postImage,
    likes,
    caption,
    comments,
    liked_users,
    postIdTemp,
    userIdTemp,
  } = post;

  return (
    <View style={styles.postContainer}>
      <Divider width={1} orientation="vertical" />
      <PostHeader profile_picture={profile_picture} user={user} />
      <PostImage postImage={postImage} />
      <View style={{ marginHorizontal: 15 }}>
        <PostFooter
          liked_users={liked_users}
          currenUser={currenUser}
          postIdTemp={postIdTemp}
          userIdTemp={userIdTemp}
        />
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
      <Image source={{ uri: profile_picture }} style={styles.postHeaderImg} />
      <Text style={styles.postHeaderText}>{user.toLowerCase()}</Text>
    </TouchableOpacity>

    <TouchableOpacity>
      <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
    </TouchableOpacity>
  </View>
);

const PostImage = ({ postImage }) => (
  <View style={{ width: "100%", height: 450, marginBottom: 10 }}>
    <Image source={{ uri: postImage }} style={styles.postImage} />
  </View>
);

const PostFooter = ({ liked_users, currenUser, postIdTemp, userIdTemp }) => {
  const handleLike = async (currenUser, postIdTemp, userIdTemp) => {
    const dbRef = doc(fsbase, `users/${userIdTemp}/posts/${postIdTemp}`);
    const postsDetails = await getDoc(dbRef);
    const currentData = postsDetails.data();
    const alreadyLiked = currentData.liked_users.includes(currenUser);

    if (!alreadyLiked) {
      const db = getFirestore();
      await updateDoc(dbRef, {
        likes: increment(1),
        liked_users: firebase.firestore.FieldValue.arrayUnion(currenUser),
      });
    } else {
      const db = getFirestore();
      await updateDoc(dbRef, {
        likes: increment(-1),
        liked_users: firebase.firestore.FieldValue.arrayRemove(currenUser),
      });
    }
  };

  return (
    <View style={{ flexDirection: "row", marginBottom: 5 }}>
      <TouchableOpacity style={styles.postFooterLeftContainer}>
        <TouchableOpacity
          style={{ height: 25, width: 25 }}
          onPress={() => handleLike(currenUser, postIdTemp, userIdTemp)}
        >
          <Icon
            imgStyle={styles.postFooterIcon}
            imgUrl={
              !liked_users.includes(currenUser)
                ? postFooterIcons[0].image
                : postFooterIcons[0].imageActive
            }
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 25, width: 25 }}>
          <Icon
            imgStyle={styles.postFooterIcon}
            imgUrl={postFooterIcons[1].image}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 25, width: 25 }}>
          <Icon
            imgStyle={styles.postFooterIcon}
            imgUrl={postFooterIcons[2].image}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.postFooterRightContainer}>
        <TouchableOpacity style={{ height: 25, width: 25 }}>
          <Icon
            imgStyle={styles.postFooterIcon}
            imgUrl={postFooterIcons[3].image}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const Icon = ({ imgStyle, imgUrl }) => (
  <View>
    <Image style={imgStyle} source={imgUrl} />
  </View>
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
      {comments.map(({ user, commentId, comment }) => (
        <View key={commentId} style={{ flexDirection: "row", marginBottom: 2 }}>
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
