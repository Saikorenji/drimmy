import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function EditDream() {
  const { dream } = useLocalSearchParams();
  const router = useRouter();
  const dreamData = dream ? JSON.parse(dream) : null;

  const [dreamText, setDreamText] = useState('');
  const [dreamLocation, setDreamLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (dreamData) {
      setDreamText(dreamData.dreamText || '');
      setDreamLocation(dreamData.dreamLocation || '');
    }
    setIsLoading(false);
  }, [dreamData]);

  const handleSaveChanges = async () => {
    try {
      const existingData = await AsyncStorage.getItem('dreamFormDataArray');
      let formDataArray = existingData ? JSON.parse(existingData) : [];

      formDataArray = formDataArray.map(dream =>
        dream.dreamText === dreamData.dreamText
          ? { ...dream, dreamText, dreamLocation }
          : dream
      );

      await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
      Alert.alert('Succès', 'Modifications enregistrées.');
      router.back();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput label="Titre du rêve" value={dreamText} onChangeText={setDreamText} style={styles.input} />
      <TextInput label="Lieu" value={dreamLocation} onChangeText={setDreamLocation} style={styles.input} />
      <Button title="Enregistrer" onPress={handleSaveChanges} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16 },
  input: { marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5 },
});
