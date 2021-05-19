import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";

import Card from "../components/Card";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

import Colors from "../constants/colors";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const { userChoice, onRestart, onGameOver } = props;

  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((currRounds) => currRounds + 1);
    setPastGuesses((currPastGuesses) => [
      nextNumber.toString(),
      ...currPastGuesses,
    ]);
  };

  const renderListItem = (listLen, itemData) => {
    return (
      <View style={styles.outerListItem}>
        <Card style={styles.listItem}>
          <BodyText>#{listLen - itemData.index}:</BodyText>
          <BodyText>{itemData.item}</BodyText>
        </Card>
      </View>
    );
  };

  if (availableDeviceHeight < 600) {
    restartButton = (
      <MainButton font_size={10} color={Colors.restart} onPress={onRestart}>
        RESTART
      </MainButton>
    );
  } else {
    restartButton = (
      <MainButton color={Colors.restart} onPress={onRestart}>
        RESTART
      </MainButton>
    );
  }

  if (availableDeviceHeight < 500) {
    return (
      <View
        style={{
          ...styles.screen,
          marginTop: availableDeviceHeight > 700 ? 100 : 0,
        }}
      >
        <TitleText>Jenny's Guess</TitleText>

        <View style={styles.controls}>
          <MainButton
            color={Colors.secondary}
            onPress={nextGuessHandler.bind(this, "lower")}
          >
            <Ionicons name="md-remove-sharp" size={24} color="white" />
          </MainButton>

          <NumberContainer>{currentGuess}</NumberContainer>

          <MainButton
            color={Colors.primary}
            onPress={nextGuessHandler.bind(this, "greater")}
          >
            <Ionicons name="md-add-sharp" size={24} color="white" />
          </MainButton>
        </View>

        {restartButton}

        {/* <View style={styles.prevGuessesContainer}>
          <TitleText style={styles.prevGuesses}>Previous Guesses:</TitleText>
        </View> */}
        <View
          style={{
            ...styles.listContainer,
            width: availableDeviceWidth > 350 ? "60%" : "80%",
            marginBottom: availableDeviceHeight > 700 ? 55 : 0,
          }}
        >
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        ...styles.screen,
        marginTop: availableDeviceHeight > 700 ? 100 : 0,
      }}
    >
      <TitleText>Jenny's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card
        style={{
          ...styles.buttonContainer,
          marginVertical: availableDeviceHeight > 600 ? 30 : 5,
        }}
      >
        <MainButton
          color={Colors.secondary}
          onPress={nextGuessHandler.bind(this, "lower")}
        >
          <Ionicons name="md-remove-sharp" size={24} color="white" />
        </MainButton>
        <MainButton
          color={Colors.primary}
          onPress={nextGuessHandler.bind(this, "greater")}
        >
          <Ionicons name="md-add-sharp" size={24} color="white" />
        </MainButton>
      </Card>
      {restartButton}
      <View style={styles.prevGuessesContainer}>
        <TitleText style={styles.prevGuesses}>Previous Guesses:</TitleText>
      </View>
      <View
        style={{
          ...styles.listContainer,
          width: availableDeviceWidth > 350 ? "60%" : "80%",
          marginBottom: availableDeviceHeight > 700 ? 55 : 0,
        }}
      >
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "lightblue",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    maxWidth: "90%",
    backgroundColor: "silver",
  },
  listItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "silver",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
  outerListItem: {
    width: "100%",
    alignItems: "center",
  },
  list: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  listContainer: {
    flex: 1,
  },
  prevGuesses: {
    marginTop: 20,
    fontSize: 16,
    color: Colors.secondary,
  },
  prevGuessesContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
});

export default GameScreen;
