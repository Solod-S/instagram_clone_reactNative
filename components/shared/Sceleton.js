import { InstagramLoader } from "react-native-easy-content-loader";
import { ScrollView } from "react-native";
import ContentLoader from "react-native-easy-content-loader";

const PostsSceleton = () => {
  return (
    <ScrollView>
      <InstagramLoader
        active
        listSize={2}
        imageHeight={300}
        primaryColor="#434446"
        secondaryColor="#303030"
        aSize={35}
        sTHeight={0}
        containerStyles={{ paddingHorizontal: 10 }}
      />
    </ScrollView>
  );
};

const NotificationSceleton = () => {
  return (
    <ScrollView>
      <ContentLoader
        avatar
        pRows={1}
        listSize={15}
        primaryColor="#434446"
        secondaryColor="#303030"
        aSize={35}
        // pWidth={[500]}
      />
    </ScrollView>
  );
};

export { PostsSceleton, NotificationSceleton };
