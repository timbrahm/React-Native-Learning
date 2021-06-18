import React from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

export type Props = {};

const CustomHeaderButton: React.FC<Props> = (props) => {
  return (
    <HeaderButton
      title=""
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : Colors.primary}
      {...props}
    />
  );
};

export default CustomHeaderButton;
