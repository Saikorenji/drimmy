import { Tabs } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import TabBarIcon from '@/components/TabBarIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === 'dark' ? '#fff' : '#7A5FFF',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      {/* 🏠 Accueil */}
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Accueil',
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      {/* 📝 Formulaire */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Formulaire',
          tabBarLabel: 'Formulaire',
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
        }}
      />

      {/* 📋 Liste des Rêves */}
      <Tabs.Screen
        name="List"
        options={{
          title: 'Rêves',
          tabBarLabel: 'Rêves',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />

      {/* ⚙️ Paramètres */}
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
