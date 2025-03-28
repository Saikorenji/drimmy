import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('@/assets/images/dream.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: colors.text }]}>
        Bienvenue dans Drimmy, votre journal de rêves !
      </Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>
        Enregistrez vos rêves, suivez vos émotions et analysez-les au fil du temps.
      </Text>

      {/* ✅ Correct usage of Link with asChild for proper navigation */}
      <Link href="/modal" asChild>
        <Button
          mode="contained"
          style={styles.button}
          contentStyle={{ paddingVertical: 6 }}
          labelStyle={{ fontSize: 16 }}
        >
          À propos de l'application
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    opacity: 0.8,
  },
  button: {
    borderRadius: 12,
    elevation: 3,
    width: '80%',
  },
});
