import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens";
import { useTheme } from "../ThemeContext";
import {
  lightTheme as appLightTheme,
  darkTheme as appDarkTheme,
} from "../constants/colors";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme } = useTheme();

  // Combine React Navigation's default themes with your custom themes
  const navigationTheme =
    theme === "light"
      ? {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: appLightTheme.background,
            card: appLightTheme.card,
            text: appLightTheme.text,
            primary: appLightTheme.primary,
          },
        }
      : {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: appDarkTheme.background,
            card: appDarkTheme.card,
            text: appDarkTheme.text,
            primary: appDarkTheme.primary,
          },
        };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: "", // Hide the title globally
          //   headerTintColor: colors.primaryColor, // Reset header text color
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
