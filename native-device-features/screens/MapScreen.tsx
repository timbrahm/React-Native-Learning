import React, { Component } from "react";
import { StyleSheet, TextInput, View, Platform, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { PlacesStackParamList } from "../navigation/PlacesNavigator";
import CustomHeaderButton from "../components/HeaderButton";

type State = {
  selectedLocation: Boolean;
};

type ScreenNavigationProp = StackNavigationProp<PlacesStackParamList, "Places">;
type ScreenRouteProp = RouteProp<PlacesStackParamList, "Places">;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

class MapScreen extends Component<Props, State> {
  navigationParams = this.props.route.params ?? {
    readOnly: false,
    initialLat: null,
    initialLng: null,
  };
  state = {
    selectedLocation: this.navigationParams.initialLat !== null,
  };

  markerCoordinates: any =
    this.navigationParams.initialLat !== null
      ? {
          latitude: this.navigationParams.initialLat,
          longitude: this.navigationParams.initialLng,
        }
      : null;

  mapRegion: any =
    this.navigationParams.initialLat !== null
      ? {
          latitude: this.navigationParams.initialLat,
          longitude: this.navigationParams.initialLng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
      : {
          latitude: 41.850033,
          longitude: -87.6500523,
          latitudeDelta: 80,
          longitudeDelta: 80,
        };

  saveLocationHelper() {
    this.forceUpdate();
    this.savePickedLocation();
  }

  savePickedLocation = () => {};

  componentDidUpdate() {
    this.savePickedLocation = () => {
      if (!this.markerCoordinates) {
        Alert.alert(
          "No Location Chosen",
          "Please choose a location on the map",
          [{ text: "Ok" }]
        );
        return;
      }

      this.props.navigation.navigate("NewPlace", {
        pickedLocation: this.markerCoordinates,
      });
    };
  }

  componentDidMount() {
    this.forceUpdate();
    if (this.navigationParams.readOnly) {
      return;
    }
    this.props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName={Platform.OS === "ios" ? "ios-add" : "md-add"}
            onPress={this.saveLocationHelper.bind(this)}
          />
        </HeaderButtons>
      ),
    });
  }

  selectLocationHandler(event: any) {
    if (this.navigationParams.readOnly) {
      return;
    }
    this.forceUpdate();
    // console.log(event);
    this.setState({
      selectedLocation: true,
    });

    this.markerCoordinates = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
  }

  render() {
    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion={this.mapRegion}
          // provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          onPress={this.selectLocationHandler.bind(this)}
        >
          {this.state.selectedLocation && (
            <Marker
              draggable
              onDragEnd={this.selectLocationHandler.bind(this)}
              title={
                this.markerCoordinates.latitude.toString() +
                " " +
                this.markerCoordinates.longitude.toString()
              }
              coordinate={this.markerCoordinates}
            ></Marker>
          )}
        </MapView>
        <View style={{ position: "absolute", top: 10, width: "100%" }}>
          <TextInput
            style={{
              borderRadius: 10,
              margin: 10,
              color: "#000",
              borderColor: "#666",
              backgroundColor: "#FFF",
              borderWidth: 1,
              height: 45,
              paddingHorizontal: 10,
              fontSize: 18,
            }}
            placeholder={"Search"}
            placeholderTextColor={"#666"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
