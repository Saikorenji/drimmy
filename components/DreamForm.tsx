import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Slider } from '@miblanchard/react-native-slider';

const { width } = Dimensions.get('window');

export default function DreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [dreamLocation, setDreamLocation] = useState('');
  const [dreamEvent, setDreamEvent] = useState('');
  const [dreamType, setDreamType] = useState('');
  const [emotionBefore, setEmotionBefore] = useState('');
  const [emotionAfter, setEmotionAfter] = useState('');
  const [tags, setTags] = useState('');
  const [personalMeaning, setPersonalMeaning] = useState('');
  const [tone, setTone] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [date, setDate] = useState('');
  const [emotionIntensity, setEmotionIntensity] = useState(5);
  const [clarity, setClarity] = useState(5);

  const handleDreamSubmission = async () => {
    try {
      // Récupération des rêves existants
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      // Ajout du nouveau rêve
      formDataArray.push({
        dreamText,
        dreamLocation,
        dreamEvent,
        dreamType,
        emotionBefore,
        emotionAfter,
        tags,
        personalMeaning,
        tone,
        sleepQuality,
        isLucidDream,
        date,
        emotionIntensity,
        clarity
      });

      // Sauvegarde dans AsyncStorage
      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
      console.log('Données sauvegardées:', formDataArray);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }

    // Réinitialisation du formulaire
    setDreamText('');
    setDreamLocation('');
    setDreamEvent('');
    setDreamType('');
    setEmotionBefore('');
    setEmotionAfter('');
    setTags('');
    setPersonalMeaning('');
    setTone('');
    setSleepQuality('');
    setIsLucidDream(false);
    setDate('');
    setEmotionIntensity(5);
    setClarity(5);
  };

  return (
    <ScrollView style={styles.container}>
    <Text>Date du rêve :</Text>
          <Calendar
            onDayPress={(day) => setDate(day.dateString)}
            markedDates={{ [date]: { selected: true, selectedColor: 'blue' } }}
            style={styles.calendar}
          />

      <TextInput
        label="Tu as rêvé de quoi ?"
        value={dreamText}
        onChangeText={setDreamText}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <TextInput
        label="C'était où ?"
        value={dreamLocation}
        onChangeText={setDreamLocation}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Que se passait-il ?"
        value={dreamEvent}
        onChangeText={setDreamEvent}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Text>Type de rêve :</Text>
      <Picker selectedValue={dreamType} onValueChange={setDreamType} style={styles.picker}>
        <Picker.Item label="Rêve ordinaire" value="ordinaire" />
        <Picker.Item label="Rêve lucide" value="lucide" />
        <Picker.Item label="Cauchemar" value="cauchemar" />
      </Picker>

      <Text>Émotion avant le rêve :</Text>
      <Picker selectedValue={emotionBefore} onValueChange={setEmotionBefore} style={styles.picker}>
        <Picker.Item label="Neutre" value="neutre" />
        <Picker.Item label="Stressé" value="stressé" />
        <Picker.Item label="Heureux" value="heureux" />
      </Picker>

      <Text>Émotion après le rêve :</Text>
      <Picker selectedValue={emotionAfter} onValueChange={setEmotionAfter} style={styles.picker}>
        <Picker.Item label="Neutre" value="neutre" />
        <Picker.Item label="Apaisé" value="apaisé" />
        <Picker.Item label="Anxieux" value="anxieux" />
      </Picker>

      <Text>Intensité émotionnelle :</Text>
      <Slider value={emotionIntensity} onValueChange={setEmotionIntensity} minimumValue={1} maximumValue={10} step={1} />
      <Text>{emotionIntensity} / 10</Text>

      <Text>Clarté du rêve :</Text>
      <Slider value={clarity} onValueChange={setClarity} minimumValue={1} maximumValue={10} step={1} />
      <Text>{clarity} / 10</Text>

      <TextInput
        label="Tags ou Mots-clés"
        value={tags}
        onChangeText={setTags}
        mode="outlined"
        style={styles.input}
      />

      <Text>Qualité du sommeil :</Text>
      <Picker selectedValue={sleepQuality} onValueChange={setSleepQuality} style={styles.picker}>
        <Picker.Item label="Excellente" value="excellente" />
        <Picker.Item label="Bonne" value="bonne" />
        <Picker.Item label="Moyenne" value="moyenne" />
        <Picker.Item label="Mauvaise" value="mauvaise" />
      </Picker>

      <TextInput
        label="Signification personnelle du rêve"
        value={personalMeaning}
        onChangeText={setPersonalMeaning}
        mode="outlined"
        multiline
        numberOfLines={3}
        style={styles.input}
      />

      <Text>Tonalité globale du rêve :</Text>
      <Picker selectedValue={tone} onValueChange={setTone} style={styles.picker}>
        <Picker.Item label="Positive" value="positive" />
        <Picker.Item label="Négative" value="négative" />
        <Picker.Item label="Neutre" value="neutre" />
      </Picker>

      <Button mode="contained" onPress={handleDreamSubmission} style={styles.button}>
        Soumettre
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 16, width: width * 0.8, alignSelf: 'center' },
  calendar: { borderRadius: 10, elevation: 4, marginBottom: 16 },
  picker: { height: 50, width: width * 0.8, alignSelf: 'center' },
  button: { marginTop: 8 },
});

