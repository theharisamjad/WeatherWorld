import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator";
import useFonts from "./hooks/useFonts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { Provider } from "react-redux";
import { store } from "./store";

// Keep the splash screen visible while we fetch resources

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  // const { theme, paperTheme } = useTheme();
  const fontsLoaded = useFonts();

  useEffect(() => {
    async function prepare() {
      try {
        // Artificial delay for two seconds, remove in production code
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]); // Run prepare when fonts are loaded

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <PaperProviderWrapper>
            <Provider store={store}>
              <AppNavigator />
            </Provider>
          </PaperProviderWrapper>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const PaperProviderWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { paperTheme } = useTheme();
  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default App;
