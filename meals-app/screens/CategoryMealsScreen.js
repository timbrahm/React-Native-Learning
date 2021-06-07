import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const CategoryMealsScreen = (props) => {
  const categoryItem = props.navigation.getParam("categoryItem");

  return (
    <View style={styles.screen}>
      <Text>The Category Meals Screen!</Text>
      <Text>{categoryItem.title}</Text>
      <Button
        title="Go to Meal Details!"
        onPress={() => {
          props.navigation.navigate("MealDetail");
        }}
      />
      <Button
        title="Go Back"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
    </View>
  );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryItem = navigationData.navigation.getParam("categoryItem");

  return {
    headerTitle: categoryItem.title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
