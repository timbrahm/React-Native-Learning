import React from "react";
import { StyleSheet, FlatList, View } from "react-native";

import MealItem from "./MealItem";

const MealList = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        item={itemData.item}
        onSelect={() => {
          props.navigation.navigate({
            routeName: "MealDetail",
            params: {
              meal: itemData.item,
            },
          });
        }}
      />
    );
  };

  return (
    <View style={{ ...props.style, ...styles.mealList }}>
      <FlatList
        data={props.mealData}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default MealList;

const styles = StyleSheet.create({
  mealList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "silver",
  },
});
