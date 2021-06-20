import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import PlacesListScreen from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";

import Colors from "../constants/Colors";

export type PlacesStackParamList = {
  Places: undefined;
  PlaceDetail: {
    placeTitle: string;
    placeId: any;
  };
  NewPlace: undefined;
  Map: undefined;
};

const Stack = createStackNavigator<PlacesStackParamList>();

export const PlacesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Places"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "ios" ? "" : Colors.primary,
        },
        headerTintColor: Platform.OS === "ios" ? Colors.primary : "white",
      }}
    >
      <Stack.Screen
        name="Places"
        component={PlacesListScreen}
        options={{ headerTitle: "All Places" }}
      />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
      <Stack.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={{
          headerTitle: "Add a Place",
        }}
      />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};
