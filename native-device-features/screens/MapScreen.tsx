import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { PlacesStackParamList } from "../navigation/PlacesNavigator";

type State = {};

type ScreenNavigationProp = StackNavigationProp<PlacesStackParamList, "Places">;
type ScreenRouteProp = RouteProp<PlacesStackParamList, "Places">;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

class MapScreen extends Component<Props, State> {
  state = {};

  render() {
    return (
      <View style={styles.screen}>
        <Text>MapScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
