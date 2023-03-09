import { Bullets } from "react-native-easy-content-loader";
import { ScrollView, View } from "react-native";

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

export default SubscriptionSkeleton;
