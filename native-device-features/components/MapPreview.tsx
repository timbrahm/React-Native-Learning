import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import ENV from "../env";

type Location = {
  lat: number;
  lng: number;
};

type State = {
  mapUrlState: string;
};

type Props = {
  onClick: any;
  location?: Location;
  style?: any;
};

class MapPreview extends Component<Props, State> {
  state = {
    mapUrlState: "",
  };

  mapUrl = "";

  componentDidMount() {
    this.mapUrl = this.props.location
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${this.props.location.lat},${this.props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${this.props.location.lat},${this.props.location.lng}&key=${ENV.googleApiKey}`
      : "";

    if (this.state.mapUrlState !== this.mapUrl) {
      this.setState({
        mapUrlState: this.mapUrl,
      });
    }
  }

  componentDidUpdate() {
    this.mapUrl = this.props.location
      ? `https://maps.googleapis.com/maps/api/staticmap?center=${this.props.location.lat},${this.props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${this.props.location.lat},${this.props.location.lng}&key=${ENV.googleApiKey}`
      : "";

    if (this.state.mapUrlState !== this.mapUrl) {
      this.setState({
        mapUrlState: this.mapUrl,
      });
    }
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onClick}
        style={{ ...styles.mapPreview, ...this.props.style }}
      >
        {this.props.location ? (
          <Image style={styles.mapImage} source={{ uri: this.mapUrl }} />
        ) : (
          this.props.children
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
});

export default MapPreview;
