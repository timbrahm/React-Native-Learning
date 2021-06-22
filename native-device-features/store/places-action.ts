import * as FileSystem from "expo-file-system";

import { insertPlace, fetchPlaces } from "../helpers/db";
import ENV from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title: string, image: string, location: any) => {
  return async (dispatch: Function) => {
    const geoResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!geoResponse.ok) {
      throw new Error("Something went wrong!");
    }

    const geoResData = await geoResponse.json();
    if (!geoResData.results) {
      throw new Error("Something went wrong!");
    }

    const address = geoResData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    let newPath = FileSystem.documentDirectory;
    if (newPath) {
      newPath = newPath + fileName;

      try {
        await FileSystem.moveAsync({
          from: image,
          to: newPath,
        });

        const dbResult: any = await insertPlace(
          title,
          newPath,
          address,
          location.lat,
          location.lng
        );

        dispatch({
          type: ADD_PLACE,
          placeData: {
            id: dbResult.insertId,
            title: title,
            image: newPath,
            address: address,
            coords: {
              lat: location.lat,
              lng: location.lng,
            },
          },
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      console.log("places-actions.ts - newPath is null");
      throw new Error("newPath is null");
    }
  };
};

export const loadPlaces = () => {
  return async (dispatch: Function) => {
    try {
      const dbResult: any = await fetchPlaces();

      dispatch({ type: SET_PLACES, places: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
