import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeScreenDefault from "./HomeScreenDefault";
import NewCommentScreen from "./nestedScreens/NewCommentScreen";
import NewPostScreen from "./nestedScreens/NewPostScreen";
import MyLoader from "./Sceleton";

const NestedScreen = createStackNavigator();

const HomeScreen = ({ navigation, route }) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const tabHiddenRoutes = ["NewPostScreen", "NewCommentScreen"];
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: { backgroundColor: "black", display: "flex" },
      });
    }
  }, [navigation, route]);
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="HomeScreenDefault"
        component={HomeScreenDefault}
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="NewCommentScreen"
        component={NewCommentScreen}
      />
      {/* <NestedScreen.Screen
        options={{ headerShown: false }}
        name="NewPostScreen"
        component={NewPostScreen}
      /> */}
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="NewPostScreen"
        component={NewPostScreen}
      />
    </NestedScreen.Navigator>
  );
};

export default HomeScreen;
