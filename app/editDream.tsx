import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditDream() {
  const { dream } = useLocalSearchParams();
  const router = useRouter();
  const dreamData = dream ? JSON.parse(dream) : null;

  // États pour chaque champ du rêve
  const [dreamText, setDreamText] = useState('');
  const [dreamLocation, setDreamLocation] = useState('');
  const [dreamEvent, setDreamEvent] = useState('');
  const [date, setDate] = useState('');
  const [dreamType, setDreamType] = useState('');
  const [emotionBefore, setEmotionBefore] = useState('');
  const [emotionAfter, setEmotionAfter] = useState('');
  const [tags, setTags] = useState('');
  const [emotionIntensity, setEmotionIntensity] = useState('');
  const [clarity, setClarity] = useState('');
  const [personalMeaning, setPersonalMeaning] = useState('');
  const [tone, setTone] = useState('');

  // ✅ Correction : Remplir les champs uniquement au premier rendu
  useEffect(() => {
    if (!dreamData) return;

    setDreamText(prev => prev || dreamData.dreamText || '');
    setDreamLocation(prev => prev || dreamData.dreamLocation || '');
    setDreamEvent(prev => prev || dreamData.dreamEvent || '');
    setDate(prev => prev || dreamData.date || '');
    setDreamType(prev => prev || dreamData.dreamType || '');
    setEmotionBefore(prev => prev || dreamData.emotionBefore || '');
    setEmotionAfter(prev => prev || dreamData.emotionAfter || '');
    setTags(prev => prev || dreamData.tags || '');
    setEmotionIntensity(prev => prev || dreamData.emotionIntensity || '');
    setClarity(prev => prev || dreamData.clarity || '');
    setPersonalMeaning(prev => prev || dreamData.personalMeaning || '');
    setTone(prev => prev || dreamData.tone || '');
  }, []); // ✅ Exécute l'effet une seule fois

  // ✅ Sauvegarde des modifications avec vérification
  const handleSaveChanges = useCallback(async () => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      let formDataArray = existingData ? JSON.parse(existingData) : [];

      // Vérifier si le rêve à modifier existe bien
      const dreamIndex = formDataArray.findIndex(d => d.dreamText === dreamData?.dreamText);

      if (dreamIndex !== -1) {
        formDataArray[dreamIndex] = {
          ...formDataArray[dreamIndex],
          dreamText, dreamLocation, dreamEvent, date, dreamType,
          emotionBefore, emotionAfter, tags, emotionIntensity,
          clarity, personalMeaning, tone,
        };

        await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
        Alert.alert("Succès", "Les modifications ont été enregistrées !");
        router.back(); // ✅ Retour à la page des détails du rêve
      } else {
        Alert.alert("Erreur", "Impossible de trouver le rêve à modifier.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la modification.");
    }
  }, [
    dreamText, dreamLocation, dreamEvent, date, dreamType,
    emotionBefore, emotionAfter, tags, emotionIntensity,
    clarity, personalMeaning, tone, router, dreamData
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput placeholder="Titre du rêve" value={dreamText} onChangeText={setDreamText} style={styles.input} />
      <TextInput placeholder="Lieu" value={dreamLocation} onChangeText={setDreamLocation} style={styles.input} />
      <TextInput placeholder="Date" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Type de rêve" value={dreamType} onChangeText={setDreamType} style={styles.input} />
      <TextInput placeholder="Émotion avant" value={emotionBefore} onChangeText={setEmotionBefore} style={styles.input} />
      <TextInput placeholder="Émotion après" value={emotionAfter} onChangeText={setEmotionAfter} style={styles.input} />
      <TextInput placeholder="Mots-clés" value={tags} onChangeText={setTags} style={styles.input} />
      <TextInput placeholder="Intensité émotionnelle (0-10)" value={emotionIntensity} onChangeText={setEmotionIntensity} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Clarté du rêve (0-10)" value={clarity} onChangeText={setClarity} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Signification personnelle" value={personalMeaning} onChangeText={setPersonalMeaning} style={styles.input} />
      <TextInput placeholder="Tonalité (Positive, Neutre, Négative)" value={tone} onChangeText={setTone} style={styles.input} />
      <TextInput placeholder="Description du rêve" value={dreamEvent} onChangeText={setDreamEvent} multiline numberOfLines={3} style={styles.input} />

      <Button title="💾 Enregistrer les modifications" onPress={handleSaveChanges} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#F8F9FA' },
  input: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16
  },
});
