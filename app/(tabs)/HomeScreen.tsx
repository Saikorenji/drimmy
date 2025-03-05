import React, { useState } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Button, Card } from 'react-native-paper';
import InfoModal from '../modal'; // Importation du modal d'info

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, colorScheme === 'dark' ? styles.darkBackground : styles.lightBackground]}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Bienvenue sur Drimmy, votre journal de rêves 🌙</Text>
          <Text style={styles.subtitle}>
            Enregistrez vos rêves, suivez vos émotions et analysez-les au fil du temps.
          </Text>
          <Button mode="contained" onPress={() => setModalVisible(true)} style={styles.button}>
            À propos de l'application
          </Button>
        </Card.Content>
      </Card>

      {/* Modal d'information */}
      <InfoModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { width: '90%', padding: 20, borderRadius: 10, elevation: 5 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#666' },
  button: { marginTop: 10 },
  darkBackground: { backgroundColor: '#121212' },
  lightBackground: { backgroundColor: '#f7f7f7' },
});
