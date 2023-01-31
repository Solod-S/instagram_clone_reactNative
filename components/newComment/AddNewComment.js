import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRef } from "react";
import { Divider } from "@rneui/themed";

import FormikCommentploader from "./FormikCommentploader";

const AddNewComment = ({ navigation, post }) => {
  console.log(post);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <About post={post} />
      <CommentsList post={post} />
      <FormikCommentploader />
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        source={require("../../assets/back-icon.png")}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
    <Text style={styles.headerText}>COMMENTS</Text>
    <Text></Text>
  </View>
);

const About = ({ post }) => {
  const {
    caption,
    user,
    owner_uid,
    time,
    date,
    postIdTemp,
    userIdTemp,
    profile_picture,
  } = post;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 10,
      }}
    >
      <TouchableOpacity style={styles.commentLink}>
        <Image source={{ uri: profile_picture }} style={styles.commentImg} />
      </TouchableOpacity>
      <View style={{ flex: 1, paddingHorizontal: 0 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Text style={{ color: "white" }}>{user.toLowerCase()}</Text>
          <Text style={styles.created}>
            {date} | {time}
          </Text>
        </View>
        <View>
          <Text style={styles.comment}>{caption}</Text>
        </View>
      </View>
    </View>
  );
};

const CommentsList = ({ post }) => {
  const scrollRef = useRef(null);
  return (
    <>
      <Divider width={1} orientation="vertical" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }
        style={{ marginBottom: 50, paddingHorizontal: 12, paddingTop: 20 }}
      >
        {post.comments.length > 0 &&
          post.comments.map(
            ({
              comment,
              commentId,
              created,
              id,
              owner_uid,
              profile_picture,
              user,
              date,
              time,
            }) => (
              <Comment
                key={commentId}
                comment={comment}
                created={created}
                id={id}
                owner_uid={owner_uid}
                profile_picture={profile_picture}
                user={user}
                date={date}
                time={time}
              />
            )
          )}
      </ScrollView>
    </>
  );
};

const Comment = ({
  comment,
  commentId,
  created,
  id,
  owner_uid,
  profile_picture,
  user,
  date,
  time,
}) => {
  // console.log(date.toLocaleDateString());
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
      <TouchableOpacity style={styles.commentLink}>
        <Image source={{ uri: profile_picture }} style={styles.commentImg} />
      </TouchableOpacity>
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Text style={styles.name}>{user.toLowerCase()}</Text>
          <Text style={styles.created}>
            {date} | {time}
          </Text>
        </View>
        <View>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
    // marginRight: 25,
  },
  commentLink: { marginRight: 5 },
  commentImg: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: "#ff8501",
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
  },
  created: {
    color: "gray",
    fontSize: 10,
    fontWeight: "900",
  },
  comment: {
    color: "white",
    fontSize: 14,

    fontWeight: "600",
  },
});

export default AddNewComment;
