import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function FourScreen() {
  const { dream } = useLocalSearchParams();
  const router = useRouter();

  const dreamData = dream ? JSON.parse(dream) : null;

  if (!dreamData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun rêve sélectionné.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🌙 Détails du Rêve</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🌟 Rêve :</Text>
        <Text style={styles.value}>{dreamData.dreamText}</Text>

        <Text style={styles.label}>📍 Lieu :</Text>
        <Text style={styles.value}>{dreamData.dreamLocation}</Text>

        <Text style={styles.label}>📅 Date :</Text>
        <Text style={styles.value}>{dreamData.date || 'Non spécifié'}</Text>

        <Text style={styles.label}>💭 Type :</Text>
        <Text style={styles.value}>{dreamData.dreamType || 'Non spécifié'}</Text>

        <Text style={styles.label}>🎭 Émotions :</Text>
        <Text style={styles.value}>Avant: {dreamData.emotionBefore || 'Non spécifié'}</Text>
        <Text style={styles.value}>Après: {dreamData.emotionAfter || 'Non spécifié'}</Text>

        <Text style={styles.label}>🔖 Mots-clés :</Text>
        <Text style={styles.value}>{dreamData.tags || 'Aucun mot-clé'}</Text>

        <Text style={styles.label}>📊 Intensité émotionnelle :</Text>
        <Text style={styles.value}>{dreamData.emotionIntensity ? `${dreamData.emotionIntensity} / 10` : 'Non spécifié'}</Text>

        <Text style={styles.label}>🔍 Clarté du rêve :</Text>
        <Text style={styles.value}>{dreamData.clarity ? `${dreamData.clarity} / 10` : 'Non spécifié'}</Text>

        <Text style={styles.label}>📖 Signification personnelle :</Text>
        <Text style={styles.value}>{dreamData.personalMeaning || 'Non renseigné'}</Text>

        <Text style={styles.label}>🔵 Tonalité :</Text>
        <Text style={[styles.value, { color: getToneColor(dreamData.tone) }]}>{dreamData.tone || 'Neutre'}</Text>
      </View>

      {/* 📜 Ajout de la description du rêve 📜 */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.label}>📜 Description du rêve :</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            {dreamData.dreamEvent ? dreamData.dreamEvent : 'Aucune description renseignée.'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Fonction pour attribuer une couleur en fonction de la tonalité du rêve
const getToneColor = (tone: string) => {
  if (tone === 'Positive') return 'green';
  if (tone === 'Négative') return 'red';
  return 'gray';
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  backText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#333',
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  descriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  descriptionBox: {
    backgroundColor: '#FAF3F3',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minHeight: 80,
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#444',
  },
});

export default FourScreen;
