import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";

import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealsScreen = (props) => {
  const categoryItem = props.navigation.getParam("categoryItem");

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryItem.id) >= 0
  );

  if (displayedMeals.length === 0 || !displayedMeals) {
    return (
      <View style={styles.content}>
        <DefaultText style={{ fontSize: 20 }}>No Meals Found!</DefaultText>
        <DefaultText>Maybe check your filters?</DefaultText>
      </View>
    );
  }

  return <MealList mealData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryItem = navigationData.navigation.getParam("categoryItem");

  return {
    headerTitle: categoryItem.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealsScreen;
