import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HealthMetric } from '../../types';
import { Card } from '../ui/Card';

interface HealthMetricCardProps {
  data: HealthMetric;
}

export function HealthMetricCard({ data }: HealthMetricCardProps) {
  const getStatusColor = () => {
    switch (data.status) {
      case 'good':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'danger':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getTrendIcon = () => {
    switch (data.trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '−';
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>{data.label}</Text>
        <View style={[styles.trendBadge, { backgroundColor: `${getStatusColor()}20` }]}>
          <Text style={[styles.trendText, { color: getStatusColor() }]}>
            {getTrendIcon()}
          </Text>
        </View>
      </View>

      <View style={styles.valueContainer}>
        <Text style={styles.value}>{data.value}</Text>
        <Text style={styles.unit}>{data.unit}</Text>
      </View>

      <View style={styles.updateContainer}>
        <Text style={styles.updateText}>✓ {data.lastUpdate} 업데이트</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 140,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  trendBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  unit: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
  },
  updateContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  updateText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#6b7280',
  },
});
