// 화면 타입 (네비게이션용)
export type Screen = 'home' | 'medication' | 'medicationScan' | 'community' | 'all';

// 프로필 타입 (백엔드 연동 시 동적으로 생성될 수 있도록 string으로 변경)
export type ProfileType = string;

// 프로필 역할 타입 (UI 아이콘 매핑용)
export type ProfileRole = 'ME' | 'SPOUSE' | 'KIDS' | 'PARENTS';

// 시간대 타입
export type TimeOfDay = 'morning' | 'lunch' | 'afternoon' | 'evening' | 'night';

// 프로필 정보
export interface Profile {
  id: ProfileType;
  name: string;
  label: string;
  role?: ProfileRole; // UI 아이콘 표시용
}

// 건강 상태
export type HealthStatus = 'good' | 'warning' | 'danger';

// 트렌드
export type TrendType = 'up' | 'down' | 'stable';

// 건강 지표
export interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  status: HealthStatus;
  trend: TrendType;
  lastUpdate: string;
}

// 복약 항목
export interface MedicationItem {
  id: number;
  name: string;
  time: string;
  taken: boolean;
  timeSlot: TimeOfDay;
}

// 오늘의 할 일
export interface TodayTask {
  id: number;
  type: 'MED' | 'HOSPITAL';
  title: string;
  time: string;
  done: boolean;
}
