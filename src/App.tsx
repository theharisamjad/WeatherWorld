import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator";
import useFonts from "./hooks/useFonts";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { Provider } from "react-redux";
import { store } from "./store";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

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

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={styles.container}
      onLayout={onLayoutRootView}
    >
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
