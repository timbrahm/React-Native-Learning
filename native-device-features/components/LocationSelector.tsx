import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";

import Colors from "../constants/Colors";
import MapPreview from "../components/MapPreview";

const verifyPermissions = async () => {
  const permissionResult = await Location.requestForegroundPermissionsAsync();
  if (permissionResult.status !== "granted") {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant location permissions to use this function.",
      [{ text: "Ok" }]
    );
    return false;
  }
  return true;
};

type PickedLocation = {
  lat: number;
  lng: number;
};

type State = {
  isFetching: boolean;
  pickedLocation: PickedLocation | undefined;
};

type Props = {
  onLocationPicked: Function;
  navigation: any;
  navigationParams: any;
};

class LocationSelector extends Component<Props, State> {
  state = {
    isFetching: false,
    pickedLocation: undefined,
  };

  componentDidUpdate() {
    if (this.props.navigationParams.pickedLocation) {
      const locObject = {
        lat: this.props.navigationParams.pickedLocation.latitude,
        lng: this.props.navigationParams.pickedLocation.longitude,
      };

      const { lat, lng } = this.state.pickedLocation ?? {
        lat: undefined,
        lng: undefined,
      };

      if (lat !== locObject.lat || lng !== locObject.lng) {
        this.setState({
          pickedLocation: locObject,
        });
        this.props.onLocationPicked(locObject);
      }
    }
  }

  getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }

    try {
      this.setState({
        isFetching: true,
      });
      const userLocation = await Location.getCurrentPositionAsync({
        accuracy: 3,
      });

      this.props.navigation.setParams({
        pickedLocation: undefined,
      });

      this.setState({
        pickedLocation: {
          lat: userLocation.coords.latitude,
          lng: userLocation.coords.longitude,
        },
      });
      this.props.onLocationPicked({
        lat: userLocation.coords.latitude,
        lng: userLocation.coords.longitude,
      });
    } catch (err) {
      Alert.alert(
        "Error Fetching Location!",
        "Please try again later or pick location on map",
        [{ text: "Ok" }]
      );
    }
    this.setState({
      isFetching: false,
    });
  };

  pickOnMapHandler() {
    this.props.navigation.navigate("Map");
  }

  render() {
    return (
      <View style={styles.locationSelector}>
        <MapPreview
          onClick={this.pickOnMapHandler.bind(this)}
          style={styles.mapPreview}
          location={this.state.pickedLocation}
        >
          {this.state.isFetching ? (
            <ActivityIndicator size="large" color={Colors.secondary} />
          ) : (
            <Text>No location chosen yet!</Text>
          )}
        </MapPreview>

        <View style={styles.actions}>
          <Button
            title="Get User Location"
            color={Colors.primary}
            onPress={this.getLocationHandler.bind(this)}
          />
          <Button
            title="Pick on Map"
            color={Colors.secondary}
            onPress={this.pickOnMapHandler.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  locationSelector: {
    marginBottom: 15,
    width: 200,
  },
  mapPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default LocationSelector;
