import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, createContext, useContext } from 'react';
import 'react-native-reanimated';
import { PaperProvider, Switch } from 'react-native-paper';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabBarIcon from '@/components/TabBarIcon';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'HomeScreen',
};

SplashScreen.preventAutoHideAsync();

// 💡 Contexte global pour le mode sombre
const DarkModeContext = createContext();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <DarkModeProvider />;
}

function DarkModeProvider() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadDarkMode = async () => {
      const storedTheme = await AsyncStorage.getItem('darkMode');
      if (storedTheme !== null) {
        setIsDarkMode(JSON.parse(storedTheme));
      }
    };
    loadDarkMode();
  }, []);

  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <PaperProvider>
        <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'À propos de l\'application' }} />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
    </DarkModeContext.Provider>
  );
}

export function TabLayout() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? '#fff' : '#007bff',
      }}
    >
      <Tabs.Screen
        name="two"
        options={{
          title: 'Paramètres',
          tabBarLabel: 'Paramètres',
          tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Formulaire de Rêve',
          tabBarLabel: 'Formulaire',
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
        }}
      />

      <Tabs.Screen
        name="List"
        options={{
          title: 'Liste des Rêves',
          tabBarLabel: 'Liste des Rêves',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
    </Tabs>
  );
}
