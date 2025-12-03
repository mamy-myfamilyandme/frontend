import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Home } from './src/screens';
import { BottomNav, Screen } from './src/components/navigation/BottomNav';
import { MedicationManagement } from './src/components/home/MedicationManagement';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'medication':
        return (
          <MedicationManagement
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
          />
        );
      case 'home':
      default:
        return <Home onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
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
