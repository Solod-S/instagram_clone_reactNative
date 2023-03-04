import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import PostScreen from "../screens/dashboard/nestedScreens/PostScreen";
import ProfileScreen from "../screens/dashboard/ProfileScreen";
import NewCommentScreen from "../screens/dashboard/nestedScreens/NewCommentScreen";
import NewPostScreen from "../screens/dashboard/nestedScreens/NewPostScreen";
import UserScreen from "../screens/dashboard/UserScreen";
import SubscriptionScreen from "../screens/dashboard/nestedScreens/SubscriptionScreen";
import NotificationScreen from "../screens/dashboard/nestedScreens/NotificationScreen";

const ProfileScreenStackNavigator = createStackNavigator();

const ProfileScreenStack = ({ navigation, route }) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    // const tabHiddenRoutes = ["NewPostScreen", "NewCommentScreen", "UserScreen"];
    const tabHiddenRoutes = ["NewCommentScreen", "NewPostScreen"];
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
      <ProfileScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />
      <ProfileScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <ProfileScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="PostScreen"
        component={PostScreen}
      />
    </ProfileScreenStackNavigator.Navigator>
  );
};

export default ProfileScreenStack;
