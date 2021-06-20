import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import { PlacesNavigator } from "./navigation/PlacesNavigator";
import placesReducer from "./store/places-reducer";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <PlacesNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}
