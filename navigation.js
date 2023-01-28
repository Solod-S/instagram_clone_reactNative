import { createStackNavigator } from "@react-navigation/stack";

import NewPostScreen from "./screens/NewPostScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createStackNavigator();
const screenOption = {
  headerShown: false,
};

const SignedInStack = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={screenOption}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
    </Stack.Navigator>
  );
};

const SignedOutStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={screenOption}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export { SignedInStack, SignedOutStack };
