import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const mealItem = props.navigation.getParam("meal");

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
  return {
    headerTitle: meal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName="ios-star"
          onPress={() => {
            console.log("Mark as favorite!");
          }}
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
