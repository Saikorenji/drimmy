// components/DreamForm.tsx

import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
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
      // Récupérer le tableau actuel depuis AsyncStorage
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      const formDataArray = existingData ? JSON.parse(existingData) : [];

      // Ajouter le nouveau formulaire au tableau
      formDataArray.push({ dreamText, dreamLocation, dreamEvent, isLucidDream, date });

      // Sauvegarder le tableau mis à jour dans AsyncStorage
      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

      console.log('Données sauvegardées:', formDataArray);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des données:', error);
    }

    // Réinitialisation du formulaire
    setDreamText('');
    setDreamLocation('');
    setDreamEvent('');
    setIsLucidDream(false);
    setDate('');
  };

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
