import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import Colors from "../constants/Colors";

const verifyPermissions = async () => {
  const permissionResult = await Camera.requestPermissionsAsync();
  if (permissionResult.status !== "granted") {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant camera permissions to use this function.",
      [{ text: "Ok" }]
    );
    return false;
  }
  return true;
};

type State = {
  pickedImage: string;
};

type Props = {
  onImageTaken: Function;
};

class ImageSelector extends Component<Props, State> {
  state = {
    pickedImage: "",
  };

  async takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!image.cancelled) {
      this.setState({
        pickedImage: image.uri,
      });
      this.props.onImageTaken(image.uri);
    }
  }

  async selectImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!image.cancelled) {
      this.setState({
        pickedImage: image.uri,
      });
      this.props.onImageTaken(image.uri);
    }
  }

  render() {
    return (
      <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
          {this.state.pickedImage === "" ? (
            <Text>No Image Picked Yet</Text>
          ) : (
            <Image
              style={styles.image}
              source={{ uri: this.state.pickedImage }}
            />
          )}
        </View>
        <View style={styles.selectPicContainer}>
          <Button
            title="Take Picture"
            color={Colors.primary}
            onPress={this.takeImageHandler.bind(this)}
          />
          <Button
            title="Select from Library"
            color={Colors.secondary}
            onPress={this.selectImageHandler.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
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
  selectPicContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default ImageSelector;
