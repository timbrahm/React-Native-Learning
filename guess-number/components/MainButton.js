import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Colors from "../constants/colors";

const MainButton = (props) => {
  if (props.color) {
    viewColor = props.color;
  } else {
    viewColor = Colors.primary;
  }

  if (props.font_size) {
    font_size = props.font_size;
  } else {
    font_size = 18;
  }

  let ButtonComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={{ ...styles.button, backgroundColor: viewColor }}>
          <Text style={{ ...styles.buttonText, fontSize: font_size }}>
            {props.children}
          </Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "black",
    fontFamily: "open-sans",
  },
});

export default MainButton;
