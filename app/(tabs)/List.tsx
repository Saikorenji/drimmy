// app/(tabs)/three.tsx

import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';

// Correction de l'importation de DreamList
import DreamList from '../../components/DreamList'; // <-- Chemin relatif

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste de tes rêves</Text>
      <View style={styles.separator} />
      <DreamList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee', // Ajout pour éviter le problème de lightColor/darkColor
  },
});
