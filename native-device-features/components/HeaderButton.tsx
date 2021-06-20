import React, { Component } from "react";
import { Platform } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";

type State = {};

type Props = {};

class CustomHeaderButton extends Component<Props, State> {
  state = {};

  render() {
    return (
      <HeaderButton
        {...this.props}
        title=""
        IconComponent={Ionicons}
        iconSize={23}
        color={Platform.OS === "ios" ? Colors.primary : "white"}
      />
    );
  }
}

export default CustomHeaderButton;
