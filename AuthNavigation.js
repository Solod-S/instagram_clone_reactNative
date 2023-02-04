import { SignedInStack, SignedOutStack } from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabs from "./components/home/BottomTabs";
import { bottomTabIcons } from "./data/bottomTabsIcons";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUsers } from "./redux/auth/authOperation";

const AuthNavigation = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUsers());
  }, [stateChange]);

  return (
    <NavigationContainer>
      {stateChange ? <SignedInStack /> : <SignedOutStack />}
    </NavigationContainer>
  );
};

export default AuthNavigation;
