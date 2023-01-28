import { SignedInStack, SignedOutStack } from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authStateChangeUsers } from "./redux/auth/authOperation";

import { auth } from "./firebase/firebase";

const AuthNavigation = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUsers());
    console.log(stateChange);
  }, [stateChange]);

  return (
    <NavigationContainer>
      {stateChange ? <SignedInStack /> : <SignedOutStack />}
    </NavigationContainer>
  );
};

export default AuthNavigation;

// import { StyleSheet } from "react-native";
// import { SignedInStack, SignedOutStack } from "./navigation";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useEffect, useState, useLayoutEffect } from "react";
// import AnimatedLoader from "react-native-animated-loader";

// import { auth } from "./firebase/firebase";

// const AuthNavigation = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isLoading, setisLoading] = useState(true);

//   const userHandler = (user) =>
//     user ? setCurrentUser(user) : setCurrentUser(null);

//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       userHandler(user);
//     });
//     setTimeout(() => setisLoading(false), 2000);
//   }, []);
//   if (isLoading) {
//     return (
//       <AnimatedLoader
//         visible={isLoading}
//         overlayColor="black"
//         animationStyle={styles.lottie}
//         speed={1}
//       ></AnimatedLoader>
//     );
//   }
//   return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
// };

// const styles = StyleSheet.create({
//   lottie: {
//     width: 100,
//     height: 100,
//   },
// });

// export default AuthNavigation
