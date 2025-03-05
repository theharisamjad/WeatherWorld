import "react-native-gesture-handler/jestSetup";

// Mock react-native-reanimated
jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-size-matters
jest.mock("react-native-size-matters", () => ({
  scale: (size) => size,
  verticalScale: (size) => size,
  moderateScale: (size) => size,
}));

// Mock expo-constants
jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      extra: {
        weatherApiKey: "test-api-key",
      },
    },
  },
}));

// Mock react-native-paper
jest.mock("react-native-paper", () => {
  const RNPaper = jest.requireActual("react-native-paper");
  return {
    ...RNPaper,
    useTheme: () => ({
      colors: {
        primary: "#000000",
        background: "#ffffff",
      },
    }),
  };
});

// Mock react-native-safe-area-context
jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}));
