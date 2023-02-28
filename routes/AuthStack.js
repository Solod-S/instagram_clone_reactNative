import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import DashboardBottomTabs from "../screens/dashboard/DashboardBottomTabs";

const Stack = createStackNavigator();
const screenOption = {
  headerShown: false,
};

const SignedInStack = () => {
  return (
    <>
      <Stack.Navigator screenOptions={screenOption}>
        <Stack.Screen name="DashboardScreen" component={DashboardBottomTabs} />
      </Stack.Navigator>
    </>
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
      <Stack.Screen
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export { SignedInStack, SignedOutStack };
