import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Home } from './src/screens';
import { BottomNav, Screen } from './src/components/navigation/BottomNav';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  return (
    <View style={styles.container}>
      <Home />
      <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});
