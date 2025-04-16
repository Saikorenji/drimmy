import React from 'react';
import { Button, Alert } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExportToPDF() {
  const generatePDF = async () => {
    try {
      const data = await AsyncStorage.getItem('dreamFormDataArray');
      const dreams = data ? JSON.parse(data) : [];

      if (!dreams.length) {
        Alert.alert("Aucun rêve", "Aucun rêve n'a été trouvé pour l'export.");
        return;
      }

      const htmlContent = `
        <h1>Liste des Rêves</h1>
        <ul>
          ${dreams.map((d: any) => `<li><strong>${d.dreamText}</strong><br/>Lieu: ${d.dreamLocation || 'N/A'}<br/>Date: ${d.date || 'N/A'}<br/>Résumé: ${d.dreamEvent || 'Aucun'}</li>`).join('')}
        </ul>
      `;

      const file = await RNHTMLtoPDF.convert({
        html: htmlContent,
        fileName: 'reves_export',
        base64: false,
      });

      if (file?.filePath) {
        await Sharing.shareAsync(file.filePath);
      } else {
        Alert.alert("Erreur", "Le fichier PDF n'a pas pu être créé.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Une erreur est survenue lors de l'export.");
    }
  };

  return (
    <Button title="Exporter mes rêves en PDF" onPress={generatePDF} color="purple" />
  );
}