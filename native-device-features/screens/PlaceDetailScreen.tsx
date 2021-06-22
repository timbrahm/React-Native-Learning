import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { PlacesStackParamList } from "../navigation/PlacesNavigator";
import MapPreview from "../components/MapPreview";
import Colors from "../constants/Colors";

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

  showMapHandler() {
    this.props.navigation.navigate("Map", {
      readOnly: true,
      initialLat: this.navigationParams.lat,
      initialLng: this.navigationParams.lng,
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image
          style={styles.image}
          source={{ uri: this.navigationParams.imageUrl }}
        />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{this.navigationParams.address}</Text>
          </View>
          <MapPreview
            onClick={this.showMapHandler.bind(this)}
            style={styles.mapPreview}
            location={{
              lat: this.navigationParams.lat,
              lng: this.navigationParams.lng,
            }}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  locationContainer: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary,
    textAlign: "center",
  },
  mapPreview: {
    width: "100%",
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default PlaceDetailScreen;
