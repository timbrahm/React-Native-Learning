import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { PlacesStackParamList } from "../navigation/PlacesNavigator";

type State = {};

type ScreenNavigationProp = StackNavigationProp<
  PlacesStackParamList,
  "PlaceDetail"
>;
type ScreenRouteProp = RouteProp<PlacesStackParamList, "PlaceDetail">;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

class PlaceDetailScreen extends Component<Props, State> {
  state = {};
  navigation = this.props.navigation;
  navigationParams = this.props.route.params;

  componentDidMount() {
    this.navigation.setOptions({
      headerTitle: this.navigationParams.placeTitle,
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text>PlaceDetailScreen</Text>
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

export default PlaceDetailScreen;
