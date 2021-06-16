import React from "react";
import { StyleSheet } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      IconComponent={Ionicons}
      iconSize={23}
      color={Colors.secondaryColor}
      {...props}
    />
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({});
