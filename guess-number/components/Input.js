import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    width: 100,
    height: 30,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
