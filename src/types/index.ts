// 프로필 타입 (백엔드 연동 시 동적으로 생성될 수 있도록 string으로 변경)
export type ProfileType = string;

// 프로필 역할 타입 (UI 아이콘 매핑용)
export type ProfileRole = 'ME' | 'SPOUSE' | 'KIDS' | 'PARENTS';

// 프로필 정보
export interface Profile {
  id: ProfileType;
  name: string;
  label: string;
  role?: ProfileRole; // UI 아이콘 표시용
}
