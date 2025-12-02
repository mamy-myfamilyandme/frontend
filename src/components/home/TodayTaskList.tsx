import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { TodayTask } from '../../types';
import { Card } from '../ui/Card';

interface TodayTaskListProps {
  tasks: TodayTask[];
}

export function TodayTaskList({ tasks }: TodayTaskListProps) {
  const remainingCount = tasks.filter((t) => !t.done).length;

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>오늘의 일정</Text>
        <Text style={styles.badge}>{remainingCount}개 남음</Text>
      </View>

      <View style={styles.taskList}>
        {tasks.map((task, index) => (
          <View key={task.id} style={styles.taskItem}>
            <View style={[styles.iconContainer, task.done && styles.iconDone]}>
              {task.type === 'MED' ? (
                <MaterialCommunityIcons
                  name="pill"
                  size={20}
                  color={task.done ? '#6366f1' : '#9ca3af'}
                />
              ) : (
                <Feather
                  name="calendar"
                  size={20}
                  color={task.done ? '#6366f1' : '#9ca3af'}
                />
              )}
            </View>

            <View style={styles.taskContent}>
              <View style={styles.taskHeader}>
                <Text
                  style={[styles.taskTitle, task.done && styles.taskTitleDone]}
                >
                  {task.title}
                </Text>
                <View style={styles.timeBadge}>
                  <Feather name="clock" size={12} color="#6b7280" style={{ marginRight: 4 }} />
                  <Text style={styles.timeText}>{task.time}</Text>
                </View>
              </View>
              <Text style={styles.taskDescription}>
                {task.type === 'MED' ? '식후 30분 복용' : '예약 시간 10분 전 도착'}
              </Text>
            </View>

            {index < tasks.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  badge: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6366f1',
  },
  taskList: {
    gap: 0,
  },
  taskItem: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 12,
    position: 'relative',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDone: {
    borderColor: '#6366f1',
    backgroundColor: '#eef2ff',
  },
  taskContent: {
    flex: 1,
    paddingTop: 4,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  taskTitleDone: {
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
  },
  taskDescription: {
    fontSize: 12,
    color: '#9ca3af',
  },
  separator: {
    position: 'absolute',
    left: 19,
    top: 52,
    width: 2,
    height: 40,
    backgroundColor: '#f3f4f6',
  },
});
