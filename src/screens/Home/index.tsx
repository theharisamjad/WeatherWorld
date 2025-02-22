import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "../../ThemeContext";
import { lightTheme, darkTheme } from "../../constants/colors";

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const colors = theme === "light" ? lightTheme : darkTheme;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Welcome to the Weather App!
      </Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
