require("dotenv").config(); // Load environment variables from .env file
export default {
  expo: {
    name: "Weather World",
    slug: "WeatherWorld",
    version: "1.0.0",
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID,
      },
      weatherApiKey: process.env.WEATHER_API_KEY,
      owner: process.env.EXPO_OWNER,
      runtimeVersion: {
        policy: "appVersion",
      },
      updates: {
        url: process.env.EXPO_UPDATES_URL,
      },
    },
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./src/assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.harisamjad05.WeatherWorld",
      icon: {
        dark: "./src/assets/images/ios-dark.png",
        light: "./src/assets/images/ios-light.png",
        tinted: "./src/assets/images/ios-tinted.png",
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        monochromeImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.harisamjad05.WeatherWorld",
    },
    plugins: [
      "expo-font",
      [
        "expo-splash-screen",
        {
          backgroundColor: "#ffffff",
          image: "./src/assets/images/splash-icon-dark.png",
          resizeMode: "contain",
          dark: {
            image: "./src/assets/images/splash-icon-light.png",
            backgroundColor: "#000000",
          },
          imageWidth: 200,
        },
      ],
    ],
  },
};
