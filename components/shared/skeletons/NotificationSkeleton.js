import ContentLoader from "react-native-easy-content-loader";
import { ScrollView } from "react-native";

const NotificationSkeleton = () => {
  return (
    <ScrollView>
      <ContentLoader
        active
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

export default NotificationSkeleton;
