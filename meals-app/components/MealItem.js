import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import Colors from "../constants/Colors";
import DefaultText from "./DefaultText";

const MealItem = (props) => {
  return (
    <View style={styles.mealItem}>
      <TouchableOpacity onPress={props.onSelect}>
        <View>
          <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <ImageBackground
              source={{ uri: props.item.imageUrl }}
              style={styles.bgImage}
            >
              <Text style={styles.title} numberOfLines={1}>
                {props.item.title}
              </Text>
            </ImageBackground>
          </View>

          <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
            <DefaultText style={{ fontSize: 15 }}>
              {props.item.duration}m
            </DefaultText>
            <DefaultText style={{ fontSize: 15 }}>
              {props.item.complexity.toUpperCase()}
            </DefaultText>
            <DefaultText style={{ fontSize: 15 }}>
              {props.item.affordability.toUpperCase()}
            </DefaultText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: Colors.secondaryColor,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  mealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },
});
