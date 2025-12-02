import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ProfileSwitcher } from '../components/home/ProfileSwitcher';
import { QuickActionButton } from '../components/home/QuickActionButton';
import { HealthMetricCard } from '../components/home/HealthMetricCard';
import { MedicationCheckCard } from '../components/home/MedicationCheckCard';
import {
  ProfileType,
  Profile,
  HealthMetric,
  MedicationItem,
  TimeOfDay,
} from '../types';

export function Home() {
  const [activeProfile, setActiveProfile] = useState<ProfileType>('ME');
  const [medications, setMedications] = useState<MedicationItem[]>([
    { id: 1, name: '혈압약', time: '08:00', taken: true, timeSlot: 'morning' },
    { id: 2, name: '소화제', time: '08:30', taken: true, timeSlot: 'morning' },
    { id: 3, name: '비타민', time: '12:00', taken: false, timeSlot: 'lunch' },
    { id: 4, name: '혈당약', time: '18:00', taken: false, timeSlot: 'evening' },
  ]);

  // TODO: 백엔드 연동 시 API에서 가져올 프로필 데이터
  // 회원가입 시 등록한 가족 구성원 목록을 동적으로 표시
  // 예시: 본인, 배우자, 자녀들, 부모님 등 여러 명 관리 가능
  // 각 프로필은 고유한 id를 가져야 함
  const profiles: Profile[] = [
    { id: 'ME', name: '신재혁', label: '나', role: 'ME' },
    { id: 'SPOUSE', name: '배우자', label: '배우자', role: 'SPOUSE' },
    { id: 'KIDS_1', name: '신지아', label: '자녀', role: 'KIDS' },
    { id: 'KIDS_2', name: '신민혁', label: '자녀', role: 'KIDS' },
    { id: 'PARENTS', name: '부모님', label: '부모', role: 'PARENTS' },
  ];

  const healthMetrics: HealthMetric[] = [
    {
      label: '혈압',
      value: '120/80',
      unit: 'mmHg',
      status: 'good',
      trend: 'stable',
      lastUpdate: '2시간 전',
    },
    {
      label: '혈당',
      value: '95',
      unit: 'mg/dL',
      status: 'good',
      trend: 'down',
      lastUpdate: '1시간 전',
    },
    {
      label: '체중',
      value: '68.5',
      unit: 'kg',
      status: 'warning',
      trend: 'up',
      lastUpdate: '오늘 아침',
    },
  ];

  const handleMedicationToggle = (id: number) => {
    setMedications((prev) =>
      prev.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med))
    );
  };

  const getCurrentTimeSlot = (): TimeOfDay => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 14) return 'lunch';
    if (hour < 18) return 'afternoon';
    if (hour < 21) return 'evening';
    return 'night';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>좋은 아침이에요 👋</Text>
            <Text style={styles.userName}>재혁님</Text>
          </View>
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.emergencyButton}>
              <Feather name="activity" size={20} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton}>
              <Feather name="bell" size={20} color="#6b7280" />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Switcher */}
        <ProfileSwitcher
          activeProfile={activeProfile}
          profiles={profiles}
          onProfileChange={setActiveProfile}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <QuickActionButton
              icon="bell"
              label="복약 알림"
              onPress={() => console.log('복약 알림')}
            />
            <QuickActionButton
              icon="calendar"
              label="진료 예약"
              onPress={() => console.log('진료 예약')}
            />
            <QuickActionButton
              icon="activity"
              label="건강 기록"
              onPress={() => console.log('건강 기록')}
            />
            <QuickActionButton
              icon="dollar-sign"
              label="의료비"
              onPress={() => console.log('의료비')}
            />
          </View>

          {/* Health Metrics */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.section}
            contentContainerStyle={styles.sectionContent}
          >
            {healthMetrics.map((metric, index) => (
              <HealthMetricCard key={index} data={metric} />
            ))}
          </ScrollView>

          {/* Medication Check */}
          <MedicationCheckCard
            timeOfDay={getCurrentTimeSlot()}
            medications={medications.filter(
              (med) => med.timeSlot === getCurrentTimeSlot()
            )}
            onMedicationCheck={handleMedicationToggle}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  emergencyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fef2f2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  section: {
    flexDirection: 'row',
  },
  sectionContent: {
    gap: 12,
    paddingRight: 30,
  },
});
