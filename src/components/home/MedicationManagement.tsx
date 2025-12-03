import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Screen } from '../../types';

interface MedicationManagementProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

type TimeSlot = 'MORNING' | 'LUNCH' | 'DINNER' | 'BEDTIME';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  condition: string;
  timeSlot: TimeSlot;
  taken: boolean;
  time: string;
}

export function MedicationManagement({
  currentScreen,
  onNavigate,
}: MedicationManagementProps) {
  // 날짜 생성 로직 (이번 주)
  const getWeekDays = () => {
    const today = new Date();
    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - today.getDay() + i + 1); // 월요일부터 시작
      week.push(d);
    }
    return week;
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const weekDays = getWeekDays();

  const baseMedications: Medication[] = [
    {
      id: 1,
      name: '혈압약 (암로디핀)',
      dosage: '1정',
      condition: '식후 30분',
      timeSlot: 'MORNING',
      taken: true,
      time: '08:00',
    },
    {
      id: 2,
      name: '비타민 C',
      dosage: '1정',
      condition: '식후 즉시',
      timeSlot: 'LUNCH',
      taken: false,
      time: '12:30',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>복약 관리</Text>
          <Text style={styles.headerSubtitle}>오늘도 건강하게 챙겨드세요!</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => console.log('약 추가')}>
          <Feather name="plus" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* 주간 캘린더 */}
      <View style={styles.calendarContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.calendarContent}>
          {weekDays.map((date, index) => {
            const isSelected = date.getDate() === selectedDate.getDate();
            const isToday = date.getDate() === new Date().getDate();
            const days = ['일', '월', '화', '수', '목', '금', '토'];

            return (
              <TouchableOpacity
                key={index}
                style={[styles.dateItem, isSelected && styles.dateItemSelected]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                  {days[date.getDay()]}
                </Text>
                <View style={[styles.dateCircle, isSelected && styles.dateCircleSelected]}>
                  <Text style={[styles.dateText, isSelected && styles.dateTextSelected]}>
                    {date.getDate()}
                  </Text>
                </View>
                {isToday && <View style={styles.todayDot} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {/* 리스트는 다음 단계에서 추가 */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  calendarContainer: {
    paddingVertical: 16,
  },
  calendarContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dateItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    minWidth: 56,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  dateItemSelected: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  dayText: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 8,
  },
  dayTextSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  dateCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCircleSelected: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  dateTextSelected: {
    color: '#ffffff',
  },
  todayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6366f1',
    marginTop: 6,
  },
  content: {
    flex: 1,
  },
});
