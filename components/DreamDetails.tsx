import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const DreamDetails = () => {
  const { dream } = useLocalSearchParams();
  const dreamData = JSON.parse(dream);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🌙 Détails du Rêve</Text>

      <Text style={styles.label}>🌟 Rêve :</Text>
      <Text style={styles.value}>{dreamData.dreamText}</Text>

      <Text style={styles.label}>📍 Lieu :</Text>
      <Text style={styles.value}>{dreamData.dreamLocation}</Text>

      <Text style={styles.label}>📅 Date :</Text>
      <Text style={styles.value}>{dreamData.date}</Text>

      <Text style={styles.label}>💭 Type :</Text>
      <Text style={styles.value}>{dreamData.dreamType}</Text>

      <Text style={styles.label}>🎭 Émotions :</Text>
      <Text style={styles.value}>Avant: {dreamData.emotionBefore}</Text>
      <Text style={styles.value}>Après: {dreamData.emotionAfter}</Text>

      <Text style={styles.label}>🔖 Mots-clés :</Text>
      <Text style={styles.value}>{dreamData.tags}</Text>

      <Text style={styles.label}>📊 Intensité émotionnelle :</Text>
      <Text style={styles.value}>{dreamData.emotionIntensity} / 10</Text>

      <Text style={styles.label}>🔍 Clarté du rêve :</Text>
      <Text style={styles.value}>{dreamData.clarity} / 10</Text>

      <Text style={styles.label}>📖 Signification personnelle :</Text>
      <Text style={styles.value}>{dreamData.personalMeaning}</Text>

      <Text style={styles.label}>🔵 Tonalité :</Text>
      <Text style={styles.value}>{dreamData.tone}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  value: { fontSize: 16, marginBottom: 8 },
});

export default DreamDetails;
