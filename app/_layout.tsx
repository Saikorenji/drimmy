import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/components/useColorScheme';
import TabBarIcon from '@/components/TabBarIcon';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'HomeScreen', // ✅ Met l'accueil en page par défaut
};

// ✅ Empêche l'écran de chargement de s'afficher trop longtemps
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'), // ✅ Correction du chemin
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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'À propos de l\'application' }} />
        </Stack>
      </ThemeProvider>
    </PaperProvider>
  );
}

export function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#007bff',
      }}
    >
      {/* ✅ Accueil */}
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* ✅ Correction : Renommage de "index" en "Formulaire de Rêve" */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Formulaire de Rêve',
          tabBarLabel: 'Formulaire',
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
        }}
      />

      {/* ✅ Liste des Rêves */}
      <Tabs.Screen
        name="List"
        options={{
          title: 'Liste des Rêves',
          tabBarLabel: 'Liste des Rêves',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />

      {/* ✅ Paramètres */}
      <Tabs.Screen
        name="two"
        options={{
          title: 'Paramètres',
          tabBarLabel: 'Paramètres',
          tabBarIcon: ({ color }) => <TabBarIcon name="cogs" color={color} />,
        }}
      />
    </Tabs>
  );
}
