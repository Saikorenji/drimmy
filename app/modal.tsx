import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

export default function InfoModal({ onClose }) {
  return (
    <Modal animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>🌙 À propos de l'application</Text>
          <Text style={styles.description}>
            Cette application vous permet de noter et analyser vos rêves.
            Enregistrez la date, la description, les émotions ressenties et bien plus encore !
          </Text>

          {/* Section des fonctionnalités */}
          <Text style={styles.sectionTitle}>🔹 Fonctionnalités :</Text>
          <Text style={styles.listItem}>✅ Enregistrer un rêve avec tous ses détails</Text>
          <Text style={styles.listItem}>✅ Classer les rêves par type (lucide, cauchemar...)</Text>
          <Text style={styles.listItem}>✅ Suivi des émotions avant et après le rêve</Text>
          <Text style={styles.listItem}>✅ Notifications pour ne pas oublier</Text>

          {/* Comment utiliser */}
          <Text style={styles.sectionTitle}>📌 Comment utiliser ?</Text>
          <Text style={styles.listItem}>1️⃣ Cliquez sur "Ajouter un rêve".</Text>
          <Text style={styles.listItem}>2️⃣ Remplissez les champs (date, émotions...)</Text>
          <Text style={styles.listItem}>3️⃣ Enregistrez et consultez plus tard.</Text>

          {/* Bouton de fermeture */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

// 🔹 Styles améliorés
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  listItem: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
