import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { Calendar } from 'react-native-calendars';
import { Slider } from '@miblanchard/react-native-slider';

export default function EditDream() {
  const { dream } = useLocalSearchParams();
  const router = useRouter();
  const dreamData = dream ? JSON.parse(dream) : null;

  // États du formulaire
  const [dreamText, setDreamText] = useState('');
  const [dreamLocation, setDreamLocation] = useState('');
  const [dreamEvent, setDreamEvent] = useState('');
  const [date, setDate] = useState('');
  const [dreamType, setDreamType] = useState('');
  const [emotionBefore, setEmotionBefore] = useState('');
  const [emotionAfter, setEmotionAfter] = useState('');
  const [tags, setTags] = useState('');
  const [personalMeaning, setPersonalMeaning] = useState('');
  const [tone, setTone] = useState('');
  const [isLucidDream, setIsLucidDream] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // ✅ Références pour éviter les boucles infinies
  const emotionIntensityRef = useRef(5);
  const clarityRef = useRef(5);

  // Charger les données UNE SEULE FOIS
  useEffect(() => {
    if (dreamData && !initialized) {
      setDreamText(dreamData.dreamText || '');
      setDreamLocation(dreamData.dreamLocation || '');
      setDreamEvent(dreamData.dreamEvent || '');
      setDate(dreamData.date || '');
      setDreamType(dreamData.dreamType || '');
      setEmotionBefore(dreamData.emotionBefore || '');
      setEmotionAfter(dreamData.emotionAfter || '');
      setTags(dreamData.tags || '');
      emotionIntensityRef.current = dreamData.emotionIntensity || 5;
      clarityRef.current = dreamData.clarity || 5;
      setPersonalMeaning(dreamData.personalMeaning || '');
      setTone(dreamData.tone || '');
      setIsLucidDream(dreamData.isLucidDream || false);
      setInitialized(true); // ✅ Empêcher le rechargement
    }
  }, [dreamData, initialized]); // ✅ Ne pas ajouter de `setState` ici pour éviter la boucle infinie

  // Vérification de la date
  const isFutureDate = (selectedDate) => {
    const today = new Date().toISOString().split('T')[0];
    return selectedDate > today;
  };

  // ✅ Correction : Gestion de l’enregistrement sans boucle infinie
  const handleSaveChanges = async () => {
    if (isFutureDate(date)) {
      Alert.alert('Erreur', 'La date ne peut pas être dans le futur.');
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      let formDataArray = existingData ? JSON.parse(existingData) : [];

      formDataArray = formDataArray.map((dream) =>
        dream.dreamText === dreamData.dreamText
          ? {
              ...dream,
              dreamText,
              dreamLocation,
              dreamEvent,
              date,
              dreamType,
              emotionBefore,
              emotionAfter,
              tags,
              emotionIntensity: emotionIntensityRef.current, // ✅ Utiliser `useRef`
              clarity: clarityRef.current, // ✅ Utiliser `useRef`
              personalMeaning,
              tone
            }
          : dream
      );

      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
      Alert.alert('Succès', 'Les modifications ont été enregistrées.');
      router.back();
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput label="Titre du rêve" value={dreamText} onChangeText={setDreamText} mode="outlined" style={styles.input} />
      <TextInput label="Lieu" value={dreamLocation} onChangeText={setDreamLocation} mode="outlined" style={styles.input} />

      <Calendar
        onDayPress={(day) => setDate(day.dateString)}
        markedDates={{ [date]: { selected: true, selectedColor: 'blue' } }}
        style={styles.calendar}
      />

      <TextInput label="Que se passait-il ?" value={dreamEvent} onChangeText={setDreamEvent} mode="outlined" multiline numberOfLines={3} style={styles.input} />

      <Picker selectedValue={dreamType} onValueChange={setDreamType} style={styles.picker}>
        <Picker.Item label="Ordinaire" value="ordinaire" />
        <Picker.Item label="Lucide" value="lucide" />
        <Picker.Item label="Cauchemar" value="cauchemar" />
      </Picker>

      <Picker selectedValue={emotionBefore} onValueChange={setEmotionBefore} style={styles.picker}>
        <Picker.Item label="Neutre" value="neutre" />
        <Picker.Item label="Stressé" value="stressé" />
        <Picker.Item label="Heureux" value="heureux" />
      </Picker>

      <Picker selectedValue={emotionAfter} onValueChange={setEmotionAfter} style={styles.picker}>
        <Picker.Item label="Neutre" value="neutre" />
        <Picker.Item label="Apaisé" value="apaisé" />
        <Picker.Item label="Anxieux" value="anxieux" />
      </Picker>

      {/* ✅ Slider avec useRef pour éviter les mises à jour infinies */}
      <Slider
        value={emotionIntensityRef.current}
        onValueChange={(value) => (emotionIntensityRef.current = value)}
        minimumValue={1}
        maximumValue={10}
        step={1}
      />
      <Slider
        value={clarityRef.current}
        onValueChange={(value) => (clarityRef.current = value)}
        minimumValue={1}
        maximumValue={10}
        step={1}
      />

      <TextInput label="Mots-clés" value={tags} onChangeText={setTags} mode="outlined" style={styles.input} />
      <TextInput label="Signification personnelle" value={personalMeaning} onChangeText={setPersonalMeaning} mode="outlined" multiline numberOfLines={3} style={styles.input} />

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleSaveChanges} style={styles.button}>Enregistrer</Button>
        <Button mode="outlined" onPress={() => router.back()} style={styles.button}>Annuler</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 16 },
  calendar: { marginBottom: 16 },
  picker: { marginBottom: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  button: { flex: 1, marginHorizontal: 5 },
});
