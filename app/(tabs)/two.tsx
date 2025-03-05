import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Switch, Card } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function SettingsScreen() {
  const { colors } = useTheme(); // 🎨 Applique le Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  // ✅ Charger la préférence utilisateur au démarrage
  useEffect(() => {
    const loadPreferences = async () => {
      const storedTheme = await AsyncStorage.getItem('darkMode');
      if (storedTheme !== null) {
        setIsDarkMode(JSON.parse(storedTheme));
      }

      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications !== null) {
        setIsNotificationsEnabled(JSON.parse(storedNotifications));
      }
    };
    loadPreferences();
  }, []);

  // ✅ Fonction pour basculer le mode sombre
  const toggleDarkMode = async () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
  };

  // ✅ Demande la permission des notifications au lancement
  useEffect(() => {
    async function getPermission() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    }
    getPermission();
  }, []);

  // ✅ Fonction pour gérer les notifications
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
        trigger: { hour: 8, minute: 0, repeats: true }, // 🔔 Notif à 08h chaque jour
      });
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>⚙️ Paramètres</Text>

      {/* ✅ Mode Sombre */}
      <Card style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.settingItem}>
          <Text style={[styles.label, { color: colors.text }]}>🌙 Mode Sombre</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
      </Card>

      {/* ✅ Notifications */}
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
    elevation: 3, // ✅ Ombre sur Android
    shadowColor: '#000', // ✅ Ombre sur iOS
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

