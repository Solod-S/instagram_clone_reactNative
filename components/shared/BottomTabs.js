import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { Divider } from "@rneui/themed";
import { bottomTabIcons } from "../../data/bottomTabsIcons";

const BottomTabs = ({ navigation, pageName }) => {
  const { profile_picture } = useSelector((state) => state.auth);

  const [activeTab, setaAtiveTab] = useState("");

  useEffect(() => {
    setaAtiveTab(pageName);
  }, [pageName]);

  const Icon = ({ name, icon, link }) => {
    const handleNavigation = (name, link) => {
      if (name === activeTab) {
        return null;
      }
      setaAtiveTab(name);
      navigation.replace(link);
      // navigation.navigate(link);
      setaAtiveTab(pageName);
    };

    return (
      <TouchableOpacity
        // onPress={() => setaAtiveTab(name)}
        onPress={() => handleNavigation(name, link)}
      >
        <Image
          source={name === "Profile" ? { uri: profile_picture } : icon}
          style={[
            styles.icon,
            name === "Profile" ? styles.profilePic(activeTab) : null,
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.iconContainer}>
        {bottomTabIcons.length > 0 &&
          bottomTabIcons.map(({ name, active, inactive, link }) => (
            <Icon
              key={name}
              name={name}
              link={link}
              icon={activeTab === name ? active : inactive}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#000",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
  },

  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (prop = "") => ({
    borderRadius: 50,
    borderWidth: prop === "Profile" ? 0.5 : 0,
    borderColor: "white",
  }),
});

export default BottomTabs;
