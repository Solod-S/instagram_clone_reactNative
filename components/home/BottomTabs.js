import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Divider } from "@rneui/themed";

const BottomTabs = ({ icons }) => {
  const { profile_picture } = useSelector((state) => state.auth);

  const [activeTab, setaAtiveTab] = useState("Home");
  const Icon = ({ name, icon }) => {
    return (
      <TouchableOpacity onPress={() => setaAtiveTab(name)}>
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
        {icons.length > 0 &&
          icons.map(({ name, active, inactive }) => (
            <Icon
              key={name}
              name={name}
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
