import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import InfoModal from '../modal'; // Assurez-vous du bon chemin d'importation

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Drimmy, votre journal de rêves 🌙</Text>
      <Text style={styles.subtitle}>
        Enregistrez vos rêves, suivez vos émotions et analysez-les au fil du temps.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>À propos de l'application</Text>
      </TouchableOpacity>

      {/* Affichage du modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <InfoModal onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}

// 🔹 Styles améliorés
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center', // Centre horizontalement
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

