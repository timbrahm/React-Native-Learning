import React, { useEffect, useCallback } from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const mealItem = props.navigation.getParam("meal");

  const currentMealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealItem.id)
  );

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealItem.id));
  }, [dispatch, mealItem]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealIsFavorite });
  }, [currentMealIsFavorite]);

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.content}>
        <View style={styles.container}>
          <Image source={{ uri: mealItem.imageUrl }} style={styles.image} />

          <View style={styles.details}>
            <DefaultText style={{ fontSize: 15 }}>
              {mealItem.duration}m
            </DefaultText>
            <DefaultText style={{ fontSize: 15 }}>
              {mealItem.complexity.toUpperCase()}
            </DefaultText>
            <DefaultText style={{ fontSize: 15 }}>
              {mealItem.affordability.toUpperCase()}
            </DefaultText>
          </View>

          <DefaultText style={styles.title}>Ingredients</DefaultText>

          {mealItem.ingredients.map((ingredient) => (
            <ListItem key={ingredient}>{ingredient}</ListItem>
          ))}

          <DefaultText style={styles.title}>Steps</DefaultText>

          {mealItem.steps.map((step) => (
            <ListItem key={step}>{step}</ListItem>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  const meal = navigationData.navigation.getParam("meal");

  const toggleFav = navigationData.navigation.getParam("toggleFav");
  const isFavorite = navigationData.navigation.getParam("isFav");

  return {
    headerTitle: meal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFav}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "silver",
  },
  content: {
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 25,
    textAlign: "center",
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: 200,
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#fff",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
