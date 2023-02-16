import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRef, useEffect, useState } from "react";
import { Divider } from "@rneui/themed";

import FormikCommentUploader from "./FormikCommentUploader";

const AddNewComment = ({ navigation, comments, post, setComments }) => {
  const { email, postIdTemp } = post;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const keyboardHide = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <Header navigation={navigation} />
        <CommentsList post={post} comments={comments} />
        <FormikCommentUploader
          navigation={navigation}
          userIdTemp={email}
          postIdTemp={postIdTemp}
          setComments={setComments}
          keyboardHide={keyboardHide}
        />
      </View>
    </TouchableWithoutFeedback>
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
        paddingVertical: 5,
      }}
    >
      <TouchableOpacity style={styles.commentLink}>
        <Image source={{ uri: profile_picture }} style={styles.commentImg} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <View style={styles.infoWrapper}>
          <Text style={styles.name}>{user.toLowerCase()}</Text>
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

const CommentsList = ({ post, comments }) => {
  const scrollRef = useRef(null);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current.scrollToEnd({ animated: true })
        }
        style={{
          marginBottom: 60,
          paddingHorizontal: 12,
          paddingTop: 10,
        }}
      >
        <About post={post} />
        <Divider width={1} orientation="vertical" />
        {comments.length > 0 &&
          comments.map(
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
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 15,
      }}
    >
      <TouchableOpacity style={styles.commentLink}>
        <Image source={{ uri: profile_picture }} style={styles.commentImg} />
      </TouchableOpacity>
      <View style={{ flex: 1, paddingHorizontal: 5 }}>
        <View style={styles.infoWrapper}>
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
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 3,
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
  infoWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  name: {
    color: "white",
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
