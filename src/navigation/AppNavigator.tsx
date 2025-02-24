import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens";
import { Appbar, Searchbar } from "react-native-paper";
import { useTheme } from "../ThemeContext";
import { Dimensions, Platform } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Constants from "expo-constants"; // Import expo-constants
import { clearWeatherData, fetchWeatherData } from "../features/weatherSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { paperTheme, theme, toggleTheme } = useTheme();
  const [city, setCity] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleClear = () => {
    setCity("");
    dispatch(clearWeatherData());
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: "", // Hide the title globally
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "",
            header: ({ navigation, ...props }) => (
              <Appbar.Header
                style={{
                  backgroundColor: paperTheme.background,
                  marginTop: Platform.OS === "android" ? verticalScale(10) : 0,
                }}
              >
                <Searchbar
                  value={city}
                  onSubmitEditing={() =>
                    city !== "" && city.length > 3
                      ? dispatch(fetchWeatherData(city))
                      : null
                  }
                  placeholder="Search City..."
                  onChangeText={(text) => setCity(text)}
                  onClearIconPress={() => handleClear()}
                  style={{
                    width: Dimensions.get("window").width * 0.8,
                    margin: scale(10),
                  }}
                />
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
