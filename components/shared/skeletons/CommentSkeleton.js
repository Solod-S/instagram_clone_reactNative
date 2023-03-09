import { InstagramLoader } from "react-native-easy-content-loader";
import { ScrollView } from "react-native";

const CommentSkeleton = () => {
  return (
    <ScrollView>
      <InstagramLoader
        active
        listSize={4}
        imageHeight={0}
        primaryColor="#434446"
        secondaryColor="#303030"
        aSize={35}
        sTHeight={30}
        sTWidth={300}
        containerStyles={{ paddingHorizontal: 10 }}
      />
    </ScrollView>
  );
};

export default CommentSkeleton;
