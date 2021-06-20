import React, { Component } from "react";
import { StyleSheet, FlatList, Text, View, Platform } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect, ConnectedProps } from "react-redux";

import { PlacesStackParamList } from "../navigation/PlacesNavigator";
import CustomHeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";

type State = {};
type RootState = {
  places: any;
};

const mapState = (state: RootState) => ({
  places: state.places.places,
});

const connector = connect(mapState);

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
    this.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === "ios" ? "ios-add" : "md-add"}
            onPress={() => {
              this.navigation.navigate("NewPlace");
            }}
          />
        </HeaderButtons>
      ),
    });
  }

  render() {
    return (
      <FlatList
        data={this.props.places}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <PlaceItem
            image={""}
            title={itemData.item.title}
            address={""}
            onSelect={() => {
              this.navigation.navigate("PlaceDetail", {
                placeTitle: itemData.item.title,
                placeId: itemData.item.id,
              });
            }}
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
