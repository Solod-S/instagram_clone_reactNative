import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import PostScreen from "../screens/dashboard/nestedScreens/PostScreen";
import SearchScreen from "../screens/dashboard/SearchScreen";
import NewCommentScreen from "../screens/dashboard/nestedScreens/NewCommentScreen";
import NewPostScreen from "../screens/dashboard/nestedScreens/NewPostScreen";
import UserScreen from "../screens/dashboard/UserScreen";
import SubscriptionScreen from "../screens/dashboard/nestedScreens/SubscriptionScreen";
import NotificationScreen from "../screens/dashboard/nestedScreens/NotificationScreen";

const ScreenStackNavigator = createStackNavigator();

const SearchScreenStack = ({ navigation, route }) => {
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
    <ScreenStackNavigator.Navigator>
      <ScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="SearchScreenDefault"
        component={SearchScreen}
      />
      <ScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="NewCommentScreen"
        component={NewCommentScreen}
      />
      <ScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="NewPostScreen"
        component={NewPostScreen}
      />
      <ScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="UserScreen"
        component={UserScreen}
      />
      <ScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />
      <ScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <ScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="PostScreen"
        component={PostScreen}
      />
    </ScreenStackNavigator.Navigator>
  );
};

export default SearchScreenStack;
