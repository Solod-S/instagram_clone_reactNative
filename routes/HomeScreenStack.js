import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import HomeScreen from "../screens/dashboard/HomeScreen";
import NewCommentScreen from "../screens/dashboard/nestedScreens/NewCommentScreen";
import NewPostScreen from "../screens/dashboard/nestedScreens/NewPostScreen";
import UserScreen from "../screens/dashboard/UserScreen";
import SubscriptionScreen from "../screens/dashboard/nestedScreens/SubscriptionScreen";

const HomeScreenStackNavigator = createStackNavigator();

const HomeScreenStack = ({ navigation, route }) => {
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
    <HomeScreenStackNavigator.Navigator>
      <HomeScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="HomeScreenDefault"
        component={HomeScreen}
      />
      <HomeScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="NewCommentScreen"
        component={NewCommentScreen}
      />
      <HomeScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="NewPostScreen"
        component={NewPostScreen}
      />
      <HomeScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="UserScreen"
        component={UserScreen}
      />
      <HomeScreenStackNavigator.Screen
        options={{ headerShown: false }}
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />
    </HomeScreenStackNavigator.Navigator>
  );
};

export default HomeScreenStack;
