import React from "react";

import { MEALS } from "../data/dummy-data";
import MealList from "../components/MealList";

const CategoryMealsScreen = (props) => {
  const categoryItem = props.navigation.getParam("categoryItem");

  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryItem.id) >= 0
  );

  return <MealList mealData={displayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
  const categoryItem = navigationData.navigation.getParam("categoryItem");

  return {
    headerTitle: categoryItem.title,
  };
};

export default CategoryMealsScreen;
