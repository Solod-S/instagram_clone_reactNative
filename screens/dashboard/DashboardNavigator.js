import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import FavoritesScreen from "./FavoritesScreen";

//screens

import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import NewPostScreen from "./nestedScreens/NewPostScreen";

const MainTab = createBottomTabNavigator();

const DashboardNavigator = ({ navigation }) => {
  return (
    <MainTab.Navigator
      // tabBarOptions={{
      //   keyboardHidesTabBar: true,
      // }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            // display: "flex",
            display: "flex",
            backgroundColor: "black",
          },
          null,
        ],
      }}
    >
      <MainTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarVisible: false,
          title: "HomeScreen",

          tabBarIcon: ({ focused, size, color }) => (
            <Octicons
              name="home"
              // size={focused ? 30 : 26}
              size={28}
              color={focused ? "white" : color}
            />
          ),
        }}
      />

      <MainTab.Screen
        name="SearchScreen"
        options={{
          // unmountOnBlur: true,
          headerShown: false,
          tabBarVisible: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather
              name="search"
              size={28}
              // size={focused ? 44 : 34}
              color={focused ? "white" : color}
            />
          ),
        }}
        component={NewPostScreen}
      />
      <MainTab.Screen
        name="FavoriteScreen"
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarVisible: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Fontisto
              name="favorite"
              // size={focused ? 30 : 26}
              size={24}
              color={focused ? "white" : color}
            />
          ),
        }}
        component={FavoritesScreen}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarVisible: false,
          title: "ProfileScreen",

          tabBarIcon: ({ focused, size, color }) => (
            <MaterialIcons
              name="account-circle"
              size={32}
              // size={focused ? 34 : 30}
              color={focused ? "white" : color}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default DashboardNavigator;
