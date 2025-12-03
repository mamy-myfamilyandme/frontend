import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Card } from '../ui/Card';

interface ExpensesSummaryCardProps {
  totalAmount: string;
  insuranceClaim: string;
  actualCost: string;
  unclaimedCount: number;
  onNavigate: () => void;
}

export function ExpensesSummaryCard({
  totalAmount,
  insuranceClaim,
  actualCost,
  unclaimedCount,
  onNavigate,
}: ExpensesSummaryCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>이번 달 의료비</Text>
          <Text style={styles.subtitle}>2025년 11월</Text>
        </View>
        <TouchableOpacity onPress={onNavigate}>
          <Text style={styles.detailButton}>상세보기 →</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.totalCard}>
        <View style={styles.totalHeader}>
          <Text style={styles.totalLabel}>총 의료비</Text>
          <View style={styles.trendBadge}>
            <Text style={styles.trendText}>↑ 전월 대비 12% ↑</Text>
          </View>
        </View>
        <Text style={styles.totalAmount}>{totalAmount}원</Text>
      </Card>

      <View style={styles.gridContainer}>
        <Card style={styles.insuranceCard}>
          <View style={styles.gridHeader}>
            <View style={styles.gridIcon}>
              <Feather name="shield" size={18} color="#10b981" />
            </View>
            <Text style={styles.gridLabel}>실비 청구액</Text>
          </View>
          <Text style={styles.insuranceAmount}>{insuranceClaim}원</Text>
        </Card>

        <Card style={styles.actualCard}>
          <View style={styles.gridHeader}>
            <View style={styles.gridIcon}>
              <Feather name="heart" size={18} color="#3b82f6" />
            </View>
            <Text style={styles.gridLabel}>실제 부담액</Text>
          </View>
          <Text style={styles.actualAmount}>{actualCost}원</Text>
        </Card>
      </View>

      {unclaimedCount > 0 && (
        <TouchableOpacity onPress={onNavigate} style={styles.alertCard}>
          <View style={styles.alertIcon}>
            <Feather name="file-text" size={18} color="#ca8a04" />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>미청구 내역 {unclaimedCount}건</Text>
            <Text style={styles.alertText}>실비 청구를 진행해보세요</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#ca8a04" />
        </TouchableOpacity>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  detailButton: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3b82f6',
  },
  totalCard: {
    padding: 16,
    marginBottom: 12,
  },
  totalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  trendBadge: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 12,
    color: '#92400e',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  insuranceCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  actualCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  gridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  gridIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  insuranceAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10b981',
  },
  actualAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3b82f6',
  },
  alertCard: {
    backgroundColor: '#fef9c3',
    borderWidth: 1,
    borderColor: '#fde047',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  alertIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#78350f',
    marginBottom: 2,
  },
  alertText: {
    fontSize: 12,
    color: '#92400e',
  },
});
