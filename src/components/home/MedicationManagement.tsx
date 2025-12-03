import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
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
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | TimeSlot>('ALL');
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
    {
      id: 3,
      name: '오메가3',
      dosage: '1캡슐',
      condition: '저녁 식후',
      timeSlot: 'DINNER',
      taken: false,
      time: '19:00',
    },
  ];

  const filteredMedications = baseMedications.filter(
    (med) => selectedFilter === 'ALL' || med.timeSlot === selectedFilter
  );

  const filters: { id: 'ALL' | TimeSlot; label: string }[] = [
    { id: 'ALL', label: '전체' },
    { id: 'MORNING', label: '아침' },
    { id: 'LUNCH', label: '점심' },
    { id: 'DINNER', label: '저녁' },
    { id: 'BEDTIME', label: '취침전' },
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

      {/* 필터 탭 */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContent}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterButton, selectedFilter === filter.id && styles.filterButtonSelected]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[styles.filterText, selectedFilter === filter.id && styles.filterTextSelected]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 복약 리스트 */}
      <ScrollView style={styles.content} contentContainerStyle={styles.listContent}>
        {filteredMedications.map((med) => (
          <View key={med.id} style={styles.card}>
            <View style={styles.cardLeft}>
              <View style={[styles.iconBox, med.taken && styles.iconBoxDone]}>
                <MaterialCommunityIcons
                  name="pill"
                  size={24}
                  color={med.taken ? '#10b981' : '#6366f1'}
                />
              </View>
              <View>
                <Text style={[styles.medName, med.taken && styles.medNameDone]}>
                  {med.name}
                </Text>
                <Text style={styles.medDetail}>
                  {med.dosage} • {med.condition}
                </Text>
              </View>
            </View>
            <View style={styles.cardRight}>
              <View style={styles.timeTag}>
                <Feather name="clock" size={12} color="#6b7280" />
                <Text style={styles.timeText}>{med.time}</Text>
              </View>
              <TouchableOpacity style={[styles.checkButton, med.taken && styles.checkButtonDone]}>
                {med.taken ? (
                  <Feather name="check" size={20} color="#ffffff" />
                ) : (
                  <View style={styles.checkRing} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {filteredMedications.length === 0 && (
          <View style={styles.emptyState}>
            <Feather name="inbox" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>등록된 복약 정보가 없어요</Text>
          </View>
        )}
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
  filterContainer: {
    marginBottom: 16,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonSelected: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  filterTextSelected: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxDone: {
    backgroundColor: '#d1fae5',
  },
  medName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  medNameDone: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  medDetail: {
    fontSize: 12,
    color: '#6b7280',
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonDone: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkRing: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
