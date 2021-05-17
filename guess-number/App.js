import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const { promisify } = require("util");

const sleep = promisify(setTimeout);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userNumber, setuserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setuserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setuserNumber(selectedNumber);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen
        userChoice={userNumber}
        onRestart={configureNewGameHandler}
        onGameOver={gameOverHandler}
      />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        numRounds={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="auto" />
      <Header title="Guess a Number vs. SuperModel!" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
