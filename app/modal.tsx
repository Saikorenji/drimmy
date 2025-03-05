import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Portal, Dialog, Button } from 'react-native-paper';

export default function InfoModal({ visible, onClose }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose} style={styles.dialog}>
        <Dialog.Title style={styles.title}>🌙 À propos de l'application</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.text}>
            L'application Drimmy vous permet de noter et d'analyser vos rêves. Vous pouvez enregistrer la date,
            la description, les émotions ressenties et bien plus encore !
          </Text>
          <Text style={styles.sectionTitle}>📌 Fonctionnalités :</Text>
          <Text style={styles.text}>✅ Enregistrer un rêve avec tous ses détails</Text>
          <Text style={styles.text}>✅ Classer les rêves par type (lucide, cauchemar...)</Text>
          <Text style={styles.text}>✅ Suivi des émotions avant et après le rêve</Text>
          <Text style={styles.text}>✅ Notifications pour ne pas oublier</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose} mode="contained">Fermer</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: { backgroundColor: '#fff', borderRadius: 10 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  text: { fontSize: 16, marginBottom: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
});
