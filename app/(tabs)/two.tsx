import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch, Card } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useThemeContext } from '@/components/ThemeContext'; // 💡 Utilise le contexte global

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { isDarkMode, toggleDarkMode } = useThemeContext(); // ✅ Utilisation du contexte
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  // 🔄 Charger la préférence pour les notifications
  useEffect(() => {
    const loadPreferences = async () => {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications !== null) {
        setIsNotificationsEnabled(JSON.parse(storedNotifications));
      }
    };
    loadPreferences();
  }, []);

  // ✅ Autorisation notifications
  useEffect(() => {
    async function getPermission() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    }
    getPermission();
  }, []);

  // ✅ Fonction pour activer/désactiver les notifications
  const handleNotificationToggle = async () => {
    const newValue = !isNotificationsEnabled;
    setIsNotificationsEnabled(newValue);
    await AsyncStorage.setItem('notifications', JSON.stringify(newValue));

    if (newValue) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🛌 Pense à noter ton rêve",
          body: "Ouvre l'application pour enregistrer ton dernier rêve !",
          sound: true,
        },
        trigger: { hour: 8, minute: 0, repeats: true },
      });
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>⚙️ Paramètres</Text>

      {/* 🌙 Mode sombre */}
      <Card style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.settingItem}>
          <Text style={[styles.label, { color: colors.text }]}>🌙 Mode Sombre</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
      </Card>

      {/* 🔔 Notifications */}
      <Card style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.settingItem}>
          <Text style={[styles.label, { color: colors.text }]}>🔔 Rappels de rêves</Text>
          <Switch value={isNotificationsEnabled} onValueChange={handleNotificationToggle} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
  },
});
