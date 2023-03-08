import { InstagramLoader } from "react-native-easy-content-loader";
import { ScrollView, View } from "react-native";
import ContentLoader from "react-native-easy-content-loader";
import { Bullets } from "react-native-easy-content-loader";

const PostsSkeleton = () => {
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

const SubscriptionSkeleton = () => {
  return (
    <ScrollView>
      <Bullets
        active
        aSize={35}
        tHeight={14}
        // tWidth={100}
        listSize={5}
        primaryColor="#434446"
        secondaryColor="#303030"
        containerStyles={{ paddingHorizontal: 10 }}
      />
    </ScrollView>
  );
};

const StoriesSkeleton = () => {
  return (
    <Bullets
      active
      aSize={70}
      tHeight={0}
      // tWidth={100}
      // listSize={4}
      primaryColor="#434446"
      secondaryColor="#303030"
      // containerStyles={{ padding: 0 }}
    />
  );
};

export {
  PostsSkeleton,
  NotificationSkeleton,
  CommentSkeleton,
  SubscriptionSkeleton,
  StoriesSkeleton,
};
