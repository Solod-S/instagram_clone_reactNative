import {
  FacebookLoader,
  InstagramLoader,
} from "react-native-easy-content-loader";

const PostsSceleton = () => {
  return (
    <ScrollView>
      <InstagramLoader
        active
        listSize={4}
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

export default PostsSceleton;
