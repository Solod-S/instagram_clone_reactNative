import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider } from "@rneui/themed";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

const PLACEHOLDERIMG =
  "https://www.shorekids.co.nz/wp-content/uploads/2014/08/ig-placeholder-500.jpg";

const uploadPostSchema = yup.object().shape({
  imageUrl: yup.string().url("A URL is required").required(),
  caption: yup.string().max(2200, "Caption has reached the character limits"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thymbnailUrl, setThymbnailUrl] = useState(PLACEHOLDERIMG);
  const returnF = () => navigation.navigate("HomeScreen");
  return (
    <ScrollView>
      <Formik
        initialValues={{ caption: "", imageUrl: "" }}
        onSubmit={(values) => {
          console.log(values), navigation.goBack();
        }}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <View
              style={{
                margin: 20,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              {/* <View
              style={{
                width: "100%",
                height: 450,
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            > */}
              <Image
                source={{
                  // uri: validUrl.isUri(thymbnailUrl)
                  uri: thymbnailUrl ? thymbnailUrl : PLACEHOLDERIMG,
                }}
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "white",
                }}
              />
              {/* </View> */}
              <View style={{ flex: 1, marginLeft: 12 }}>
                <TextInput
                  placeholder="Write a caption"
                  placeholderTextColor="gray"
                  style={{ color: "white", fontSize: 18 }}
                  multiline={true}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                  // numberOfLines={3}
                />
              </View>
            </View>
            <Divider width={0.2} orientation="vertical" />
            <TextInput
              onChange={(e) => setThymbnailUrl(e.nativeEvent.text)}
              placeholder="Enter Image Url"
              placeholderTextColor="gray"
              style={{ color: "white", fontSize: 16 }}
              multiline={true}
              onChangeText={handleChange("imageUrl")}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            />
            {errors.imageUrl && (
              <Text style={{ color: "red", fontSize: 10 }}>
                {errors.imageUrl}
              </Text>
            )}

            <TouchableOpacity
              disabled={!isValid}
              style={{
                width: 100,
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              onPress={handleSubmit}
            >
              <Text style={{ color: "white", fontSize: 22 }}>Share</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default FormikPostUploader;
