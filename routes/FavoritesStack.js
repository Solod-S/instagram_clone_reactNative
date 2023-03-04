import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import PostScreen from "../screens/dashboard/nestedScreens/PostScreen";
import FavoritesScreen from "../screens/dashboard/FavoritesScreen";
import NewCommentScreen from "../screens/dashboard/nestedScreens/NewCommentScreen";
import NewPostScreen from "../screens/dashboard/nestedScreens/NewPostScreen";
import UserScreen from "../screens/dashboard/UserScreen";
import SubscriptionScreen from "../screens/dashboard/nestedScreens/SubscriptionScreen";
import NotificationScreen from "../screens/dashboard/nestedScreens/NotificationScreen";

const FavoritesStackNavigator = createStackNavigator();

const FavoritesStack = ({ navigation, route }) => {
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
    <FavoritesStackNavigator.Navigator>
      <FavoritesStackNavigator.Screen
        options={{ headerShown: false }}
        name="FavoritesScreen"
        component={FavoritesScreen}
      />
      <FavoritesStackNavigator.Screen
        options={{ headerShown: false }}
        name="NewCommentScreen"
        component={NewCommentScreen}
      />
      {/* <FavoritesStackNavigator.Screen
        options={{ headerShown: false }}
        name="NewPostScreen"
        component={NewPostScreen}
      /> */}
      <FavoritesStackNavigator.Screen
        options={{ headerShown: false }}
        name="NewPostScreen"
        component={NewPostScreen}
      />
      <FavoritesStackNavigator.Screen
        options={{ headerShown: false }}
        name="UserScreen"
        component={UserScreen}
      />
      <FavoritesStackNavigator.Screen
        options={{ headerShown: false }}
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />
      <FavoritesStackNavigator.Screen
        options={{ headerShown: false }}
        name="NotificationScreen"
        component={NotificationScreen}
      />
      <FavoritesStackNavigator.Screen
        options={{ headerShown: false }}
        name="PostScreen"
        component={PostScreen}
      />
    </FavoritesStackNavigator.Navigator>
  );
};

export default FavoritesStack;
