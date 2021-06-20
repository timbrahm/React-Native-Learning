import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { connect, ConnectedProps } from "react-redux";

import { PlacesStackParamList } from "../navigation/PlacesNavigator";
import Colors from "../constants/Colors";
import * as placesActions from "../store/places-action";
import ImageSelector from "../components/ImageSelector";

type State = {
  titleValue: string;
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
  };

  titleChangeHandler = (text: string) => {
    this.setState({
      titleValue: text,
    });
  };

  savePlaceHandler = () => {
    this.props.addPlace(this.state.titleValue);
    this.props.navigation.goBack();
  };

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
          <ImageSelector />
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
