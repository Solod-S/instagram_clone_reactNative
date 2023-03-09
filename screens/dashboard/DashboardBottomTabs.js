import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import {
  FavoritesStack,
  HomeScreenStack,
  ProfileScreenStack,
  SearchScreenStack,
} from "../../routes";

const MainTab = createBottomTabNavigator();

const DashboardBottomTabs = ({ navigation }) => {
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
        component={HomeScreenStack}
        options={{
          // unmountOnBlur: true,
          headerShown: false,
          tabBarVisible: false,
          title: "HomeScreen",

          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
              <Octicons
                name="home"
                // size={focused ? 30 : 26}
                size={28}
                color={focused ? "white" : color}
              />
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("SearchScreen")}
            >
              <Feather
                name="search"
                size={28}
                // size={focused ? 44 : 34}
                color={focused ? "white" : color}
              />
            </TouchableOpacity>
          ),
        }}
        component={SearchScreenStack}
      />
      <MainTab.Screen
        name="FavoriteScreen"
        options={{
          // unmountOnBlur: true,
          headerShown: false,
          tabBarVisible: false,
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("FavoriteScreen")}
            >
              <Fontisto
                name="favorite"
                // size={focused ? 30 : 26}
                size={24}
                color={focused ? "white" : color}
              />
            </TouchableOpacity>
          ),
        }}
        component={FavoritesStack}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreenStack}
        options={{
          // unmountOnBlur: true,
          headerShown: false,
          tabBarVisible: false,
          title: "ProfileScreen",

          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              <MaterialIcons
                name="account-circle"
                size={32}
                // size={focused ? 34 : 30}
                color={focused ? "white" : color}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default DashboardBottomTabs;
