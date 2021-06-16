import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import FiltersScreen from "../screens/FiltersScreen";

import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "ios" ? Colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
    fontSize: 18,
  },
  headerTintColor: Platform.OS === "ios" ? "white" : Colors.primaryColor,
  headerTitle: "Default Screen",
};

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen,
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: Colors.primaryColor,
      tabBarLabel: (
        <Text
          style={{ fontFamily: "open-sans-bold", fontSize: 15, color: "white" }}
        >
          Meals
        </Text>
      ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: "black",
      tabBarLabel: (
        <Text
          style={{ fontFamily: "open-sans-bold", fontSize: 15, color: "white" }}
        >
          Favorites
        </Text>
      ),
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "ios"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: Colors.secondaryColor,
        shifting: true,
        barStyle: {
          backgroundColor: Colors.primaryColor,
          height: 80,
        },
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: Colors.secondaryColor,
        },
      });

const FiltersNav = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Filters",
    },
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFavs: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
      },
    },
    Filters: FiltersNav,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primaryColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontSize: 18,
      },
    },
  }
);

export default createAppContainer(MainNavigator);
