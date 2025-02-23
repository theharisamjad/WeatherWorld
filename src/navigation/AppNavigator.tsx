import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens";
import { Appbar } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../ThemeContext";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { paperTheme, theme, toggleTheme } = useTheme();
  return (
    <NavigationContainer>
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
            header: ({ navigation, ...props }) => (
              <Appbar.Header style={{ backgroundColor: paperTheme.background }}>
                <Appbar.Content title="Weather World" />
                <>
                  <Appbar.Action
                    icon={theme === "dark" ? "weather-night" : "weather-sunny"} // Icon changes based on theme
                    iconColor={paperTheme.text} // Icon color adapts to the theme
                    onPress={() => {
                      toggleTheme();
                    }}
                  />
                </>
              </Appbar.Header>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
