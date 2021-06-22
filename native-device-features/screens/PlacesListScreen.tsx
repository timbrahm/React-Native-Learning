import React, { Component } from "react";
import { StyleSheet, FlatList, Platform, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect, ConnectedProps } from "react-redux";

import { PlacesStackParamList } from "../navigation/PlacesNavigator";
import CustomHeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-action";

type State = {};
type RootState = {
  places: any;
};

const mapState = (state: RootState) => ({
  places: state.places.places,
});

const mapDispatch = {
  loadPlaces: placesActions.loadPlaces,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ScreenNavigationProp = StackNavigationProp<PlacesStackParamList, "Places">;
type ScreenRouteProp = RouteProp<PlacesStackParamList, "Places">;

interface Props extends PropsFromRedux {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
}

class PlacesListScreen extends Component<Props, State> {
  state = {};
  navigation = this.props.navigation;

  componentDidMount() {
    try {
      this.props.loadPlaces();
    } catch (err) {
      Alert.alert(
        "Error Loading!",
        "Places could not be loaded from database",
        [{ text: "Ok" }]
      );
    }

    this.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === "ios" ? "ios-add" : "md-add"}
            onPress={() => {
              this.navigation.navigate("NewPlace", {});
            }}
          />
        </HeaderButtons>
      ),
    });
  }

  selectListItem(itemData: any) {
    this.navigation.navigate("PlaceDetail", {
      placeId: itemData.item.id,
      placeTitle: itemData.item.title,
      imageUrl: itemData.item.imageUrl,
      address: itemData.item.address,
      lat: itemData.item.lat,
      lng: itemData.item.lng,
    });
  }

  render() {
    return (
      <FlatList
        data={this.props.places}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <PlaceItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            address={itemData.item.address}
            onSelect={this.selectListItem.bind(this, itemData)}
          />
        )}
      />
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

export default connector(PlacesListScreen);
