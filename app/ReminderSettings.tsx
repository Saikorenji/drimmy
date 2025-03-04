import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { scheduleDailyReminder, getReminderTime, requestPermissions } from '../components/notification.ts';

export default function ReminderSettings() {
  const [selectedTime, setSelectedTime] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    // Charger l'heure du rappel enregistrée
    async function loadTime() {
      const time = await getReminderTime();
      setSelectedTime(time);
    }
    loadTime();
  }, []);

  // Fonction pour afficher le sélecteur d'heure
  const handleTimeChange = (_, selected) => {
    if (selected) {
      const formattedTime = selected.toTimeString().slice(0, 5);
      setSelectedTime(formattedTime);
      scheduleDailyReminder(formattedTime);
    }
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🕰️ Paramètres de Rappel</Text>
      <Text style={styles.text}>Rappel quotidien : {selectedTime || "Non défini"}</Text>

      <Button mode="contained" onPress={() => setShowPicker(true)}>
        Modifier l'heure du rappel
      </Button>

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 10 },
});
