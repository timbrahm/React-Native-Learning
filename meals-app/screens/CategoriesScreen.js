import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

const CategoriesScreen = (props) => {
  return (
    <FlatList numColumns={2} />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesScreen;
