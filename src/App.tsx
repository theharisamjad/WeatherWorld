import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./navigation/AppNavigator";
import useFonts from "./hooks/useFonts";
import { colors } from "./constants/colors";
import { ThemeProvider } from "./ThemeContext";

// Keep the splash screen visible while we fetch resources

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
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
      <SafeAreaView style={styles.container}>
        <ThemeProvider>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </ThemeProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default App;
