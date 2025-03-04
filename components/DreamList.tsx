import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';

export default function DreamList() {
  const [dreams, setDreams] = useState([]);
  const router = useRouter(); // Utilisation de expo-router pour la navigation

  // Charger les rêves au démarrage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('dreamFormDataArray');
        const dreamFormDataArray = data ? JSON.parse(data) : [];
        setDreams(dreamFormDataArray);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
    fetchData();
  }, []);

  // Recharger les rêves lorsqu'on revient sur cet écran
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const data = await AsyncStorage.getItem('dreamFormDataArray');
          const dreamFormDataArray = data ? JSON.parse(data) : [];
          setDreams(dreamFormDataArray);
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      };
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📜 Liste des Rêves :</Text>

      <FlatList
        data={dreams}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dreamItem}
            onPress={() => router.push(`/four?dream=${encodeURIComponent(JSON.stringify(item))}`)}
          >
            <Text style={styles.dreamTitle}>{item.dreamText}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  dreamItem: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 5,
  },
  dreamTitle: { fontSize: 16 },
});

export default DreamList;
