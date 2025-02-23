import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator";
import useFonts from "./hooks/useFonts";
import { Provider as PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "./ThemeContext";

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
          <PaperProviderWrapper>
            <AppNavigator />
          </PaperProviderWrapper>
        </ThemeProvider>
      </SafeAreaView>
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
