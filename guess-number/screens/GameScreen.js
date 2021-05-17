import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

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

  return (
    <View style={styles.screen}>
      <TitleText>Jenny's Guess</TitleText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
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
      <MainButton color={Colors.restart} onPress={onRestart}>
        RESTART
      </MainButton>
      <View style={styles.prevGuessesContainer}>
        <TitleText style={styles.prevGuesses}>Previous Guesses:</TitleText>
      </View>
      <View style={styles.listContainer}>
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
    marginTop: 100,
    backgroundColor: "lightblue",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
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
    width: "60%",
    flex: 1,
    marginBottom: 55,
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
});

export default GameScreen;
