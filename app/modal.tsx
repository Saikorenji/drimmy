// app/modal.tsx
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function ModalScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌙 À propos de l'application</Text>
      <Text style={styles.paragraph}>
        Cette application vous permet de noter et analyser vos rêves.
        Enregistrez la date, la description, les émotions ressenties et bien plus encore !
      </Text>

      <Text style={styles.subtitle}>🔷 Fonctionnalités :</Text>
      <Text style={styles.list}>✅ Enregistrer un rêve avec tous ses détails</Text>
      <Text style={styles.list}>✅ Classer les rêves par type (lucide, cauchemar…)</Text>
      <Text style={styles.list}>✅ Suivi des émotions avant et après le rêve</Text>
      <Text style={styles.list}>✅ Notifications pour ne pas oublier</Text>

      <Text style={styles.subtitle}>📌 Comment utiliser ?</Text>
      <Text style={styles.list}>1️⃣ Cliquez sur "Ajouter un rêve"</Text>
      <Text style={styles.list}>2️⃣ Remplissez les champs (date, émotions…)</Text>
      <Text style={styles.list}>3️⃣ Enregistrez et consultez plus tard</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  list: {
    fontSize: 16,
    marginBottom: 6,
  },
});
