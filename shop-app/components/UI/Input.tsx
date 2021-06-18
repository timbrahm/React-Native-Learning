import React, { useReducer, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface Props extends TextInputProps {
  label: string;
  errorText: string;
  onInputChange: Function;
  id: string;

  initiallyValid?: boolean;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  initialValue?: string;
  navigation?: any;
}

interface NavComponent extends React.FC<Props> {
  navigationOptions?: Object;
}

type FormState = {
  value: string;
  isValid: boolean;
  touched: boolean;
};

type FormActionChange = {
  type: string;
  value: string;
  isValid: boolean;
};

type FormActionBlur = {
  type: string;
};

type FormAction = FormActionChange | FormActionBlur;

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: (action as FormActionChange).value,
        isValid: (action as FormActionChange).isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input: NavComponent = ({
  initiallyValid = false,
  required = false,
  email = false,
  min = null,
  max = null,
  minLength = null,
  ...props
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        keyboardType="default"
        autoCapitalize="sentences"
        {...props}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: 13,
  },
});
