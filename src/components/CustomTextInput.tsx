import { StyleProp, StyleSheet, TextStyle } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { margins, sizes } from "../constants/sizes";
import { useTheme } from "../ThemeContext";
import { lightTheme, darkTheme } from "../constants/colors";
import { scale } from "react-native-size-matters";

type TextInputProps = {
  value: string | undefined;
  onChangeText: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
  style?: StyleProp<TextStyle>;
  error?: boolean;
};
const CustomTextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  multiline,
  style,
  error,
  ...props
}) => {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "light" ? lightTheme : darkTheme;
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => onChangeText(text)}
      mode="outlined"
      style={[styles.backgroundStyle, style]}
      multiline={multiline}
      outlineStyle={styles.outlineStyle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginVertical: margins.margin10,
  },
  outlineStyle: {
    borderRadius: scale(32),
  },
});

export default CustomTextInput;
