import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 📌 Demande de permission à l'utilisateur
export async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert("Permission de notification refusée !");
    return false;
  }
  return true;
}

// 📌 Planifier une notification quotidienne
export async function scheduleDailyReminder(time: string) {
  // Sauvegarder l'heure choisie par l'utilisateur
  await AsyncStorage.setItem('reminderTime', time);

  // Annuler les anciens rappels pour éviter des doublons
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Extraire l'heure et les minutes
  const [hours, minutes] = time.split(':').map(Number);
  const trigger = new Date();
  trigger.setHours(hours);
  trigger.setMinutes(minutes);
  trigger.setSeconds(0);

  // Planifier la notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Rappel matinal !",
      body: "N'oublie pas d'ajouter ton rêve de cette nuit !",
      sound: true,
    },
    trigger: { hour: hours, minute: minutes, repeats: true },
  });

  alert(`Rappel programmé à ${time} chaque jour.`);
}

// 📌 Charger l'heure du rappel depuis AsyncStorage
export async function getReminderTime() {
  return await AsyncStorage.getItem('reminderTime') || '07:00'; // Par défaut à 07:00
}
