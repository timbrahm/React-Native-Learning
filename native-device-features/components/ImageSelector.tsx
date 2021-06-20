import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Colors from "../constants/Colors";

type State = {};

type Props = {};

class ImageSelector extends Component<Props, State> {
  state = {};

  takeImageHandler() {
    ImagePicker.launchCameraAsync();
  }

  render() {
    return (
      <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
          <Text>No Image Picked Yet</Text>
          <Image style={styles.image} />
        </View>
        <Button
          title="Take Picture"
          color={Colors.primary}
          onPress={this.takeImageHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImageSelector;
