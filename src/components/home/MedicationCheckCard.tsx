import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { MedicationItem, TimeOfDay } from '../../types';
import { Card } from '../ui/Card';

interface MedicationCheckCardProps {
  timeOfDay: TimeOfDay;
  medications: MedicationItem[];
  onMedicationCheck: (id: number) => void;
  onPress?: () => void;
}

export function MedicationCheckCard({
  timeOfDay,
  medications,
  onMedicationCheck,
  onPress,
}: MedicationCheckCardProps) {
  const getTimeLabel = () => {
    switch (timeOfDay) {
      case 'morning':
        return '아침';
      case 'lunch':
        return '점심';
      case 'afternoon':
        return '오후';
      case 'evening':
        return '저녁';
      case 'night':
        return '밤';
    }
  };

  const getGradientColors = () => {
    switch (timeOfDay) {
      case 'morning':
        return ['#fb923c', '#f59e0b'];
      case 'lunch':
        return ['#facc15', '#fb923c'];
      case 'afternoon':
        return ['#60a5fa', '#06b6d4'];
      case 'evening':
        return ['#a78bfa', '#ec4899'];
      case 'night':
        return ['#6366f1', '#3b82f6'];
    }
  };

  const uncompletedCount = medications.filter((m) => !m.taken).length;
  const backgroundColor = getGradientColors()[0];

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Card style={{ ...styles.card, backgroundColor }}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Feather name="clock" size={24} color="#ffffff" />
            <Text style={styles.title}>{getTimeLabel()} 복약 체크</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>
          {uncompletedCount > 0
            ? `${uncompletedCount}개의 약을 복용하세요`
            : '모든 약을 복용하셨어요! 👏'}
        </Text>

        <View style={styles.medicationList}>
          {medications.map((med) => (
            <View key={med.id} style={styles.medicationItem}>
              <View style={styles.medicationInfo}>
                <View style={styles.pillIcon}>
                  <MaterialCommunityIcons name="pill" size={20} color="rgba(255, 255, 255, 0.9)" />
                </View>
                <View>
                  <Text
                    style={[styles.medicationName, med.taken && styles.completedText]}
                  >
                    {med.name}
                  </Text>
                  <Text style={styles.medicationTime}>{med.time}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => onMedicationCheck(med.id)}
                style={[styles.checkButton, med.taken && styles.checkedButton]}
              >
                {med.taken && <Feather name="check" size={18} color="#10b981" />}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 16,
  },
  medicationList: {
    gap: 8,
  },
  medicationItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  pillIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  medicationTime: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.8,
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});
