import { StyleProp, StyleSheet, TextStyle } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { colors } from "../constants/colors";
import { margins, sizes } from "../constants/sizes";

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
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => onChangeText(text)}
      mode="outlined"
      selectionColor={colors.white}
      cursorColor={colors.white}
      outlineColor={colors.white}
      activeOutlineColor={colors.white}
      placeholderTextColor={colors.white}
      textColor={colors.white}
      style={[styles.backgroundStyle, style]}
      multiline={multiline}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: colors.primaryColor,
    marginVertical: margins.margin10,
  },
});

export default CustomTextInput;
