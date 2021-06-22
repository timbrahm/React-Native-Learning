import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { connect, ConnectedProps } from "react-redux";

import { PlacesStackParamList } from "../navigation/PlacesNavigator";
import Colors from "../constants/Colors";
import * as placesActions from "../store/places-action";
import ImageSelector from "../components/ImageSelector";
import LocationSelector from "../components/LocationSelector";

type PickedLocation = {
  lat: number;
  lng: number;
};

type State = {
  titleValue: string;
  pickedLocation: PickedLocation | undefined;
  selectedImage: string;
};

const mapDispatch = {
  addPlace: placesActions.addPlace,
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ScreenNavigationProp = StackNavigationProp<PlacesStackParamList, "Places">;
type ScreenRouteProp = RouteProp<PlacesStackParamList, "Places">;

interface Props extends PropsFromRedux {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

class NewPlaceScreen extends Component<Props, State> {
  state: State = {
    titleValue: "",
    selectedImage: "",
    pickedLocation: undefined,
  };

  imageTakenHandler(imagePath: string) {
    this.setState({
      selectedImage: imagePath,
    });
  }

  titleChangeHandler = (text: string) => {
    this.setState({
      titleValue: text,
    });
  };

  savePlaceHandler = async () => {
    try {
      await this.props.addPlace(
        this.state.titleValue,
        this.state.selectedImage,
        this.state.pickedLocation
      );
      this.props.navigation.goBack();
    } catch (err) {
      Alert.alert("Save Place Error!", err.message, [{ text: "Ok" }]);
    }
  };

  locationPickedHandler(location: any) {
    this.setState({
      pickedLocation: location,
    });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.textInput}
            value={this.state.titleValue}
            onChangeText={this.titleChangeHandler}
          />
          <ImageSelector onImageTaken={this.imageTakenHandler.bind(this)} />
          <LocationSelector
            onLocationPicked={this.locationPickedHandler.bind(this)}
            navigation={this.props.navigation}
            navigationParams={this.props.route.params}
          />
          <Button
            title="Save Place"
            color={Colors.primary}
            onPress={this.savePlaceHandler}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 30,
  },
  label: {
    fontSize: 20,
    marginBottom: 15,
  },
  textInput: {
    width: "50%",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default connector(NewPlaceScreen);
