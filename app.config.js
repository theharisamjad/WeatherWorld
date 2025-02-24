require("dotenv").config(); // Load environment variables from .env file
export default {
  expo: {
    name: "WeatherWorld",
    slug: "WeatherWorld",
    version: "1.0.0",
    extra: {
      weatherApiKey: process.env.WEATHER_API_KEY,
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
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.harisamjad05.WeatherWorld",
    },
    plugins: ["expo-font"],
  },
};
