import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';
import { useColorScheme } from '@/components/useColorScheme';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Paramètres</Text>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Activer les notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          thumbColor={notificationsEnabled ? '#007bff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Thème actuel :</Text>
        <Text style={styles.theme}>{colorScheme === 'dark' ? '🌙 Sombre' : '☀️ Clair'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
  },
  theme: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

