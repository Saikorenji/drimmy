import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function DreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [dreamLocation, setDreamLocation] = useState('');
  const [dreamEvent, setDreamEvent] = useState('');
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [date, setDate] = useState('');

  const handleDreamSubmission = async () => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      formDataArray.push({ dreamText, dreamLocation, dreamEvent, isLucidDream, date });

      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

      console.log('Données sauvegardées:', formDataArray);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }

    setDreamText('');
    setDreamLocation('');
    setDreamEvent('');
    setIsLucidDream(false);
    setDate('');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <TextInput
          label="Tu as rêvé de quoi ?"
          value={dreamText}
          onChangeText={setDreamText}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
        />
        <TextInput
          label="C'était où ?"
          value={dreamLocation}
          onChangeText={setDreamLocation}
          mode="outlined"
          multiline
          numberOfLines={2}
          style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
        />
        <TextInput
          label="Que se passait-il ?"
          value={dreamEvent}
          onChangeText={setDreamEvent}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={[styles.input, { width: width * 0.8, alignSelf: 'center' }]}
        />
        <Calendar
          onDayPress={(day) => setDate(day.dateString)}
          markedDates={{
            [date]: { selected: true, selectedColor: 'blue' }
          }}
          style={styles.calendar}
        />
        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            label="Rêve Lucide"
            status={isLucidDream ? 'checked' : 'unchecked'}
            onPress={() => setIsLucidDream(!isLucidDream)}
          />
        </View>
        <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
          Soumettre
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
    width: '100%',
  },
  input: {
    marginBottom: 16,
    width: '80%',
    height: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    marginBottom: 16,
  }
});
