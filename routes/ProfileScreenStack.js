import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ProfileScreen from "../screens/dashboard/ProfileScreen";
import NewCommentScreen from "../screens/dashboard/nestedScreens/NewCommentScreen";
import NewPostScreen from "../screens/dashboard/nestedScreens/NewPostScreen";
import UserScreen from "../screens/dashboard/UserScreen";

const ProfileScreenStackNavigator = createStackNavigator();

const ProfileScreenStack = ({ navigation, route }) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const tabHiddenRoutes = ["NewPostScreen", "NewCommentScreen", "UserScreen"];
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: { backgroundColor: "black", display: "flex" },
      });
    }
  }, [navigation, route]);
  return (
    <ProfileScreenStackNavigator.Navigator>
      <ProfileScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="ProfileScreenDefault"
        component={ProfileScreen}
      />
      <ProfileScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="NewCommentScreen"
        component={NewCommentScreen}
      />
      <ProfileScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="NewPostScreen"
        component={NewPostScreen}
      />
      <ProfileScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="UserScreen"
        component={UserScreen}
      />
    </ProfileScreenStackNavigator.Navigator>
  );
};

export default ProfileScreenStack;
