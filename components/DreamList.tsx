import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter } from 'expo-router';

export default function DreamList() {
  const [dreams, setDreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await AsyncStorage.getItem('dreamFormDataArray');
      const dreamFormDataArray = data ? JSON.parse(data) : [];
      setDreams(dreamFormDataArray);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste de tes rêves :</Text>

      {dreams.length === 0 ? (
        <Text style={styles.noDreamText}>Aucun rêve enregistré.</Text>
      ) : (
        <FlatList
          data={dreams}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={true} //
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }} //
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.dreamItem}
              onPress={() => router.push({ pathname: '/four', params: { dream: JSON.stringify(item) } })}
            >
              <Text style={styles.dreamTitle}>{item.dreamText}</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={<View style={{ height: 30 }} />} //
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
  dreamItem: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
    width: '100%', //
  },
  dreamTitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noDreamText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#888'
  },
});
